# Vue 3 + Quasar Tutorial

Repository mit dem Quellcode für das Vue.js/Quasar-Tutorial.

## Empfohlene IDE-Einrichtung

* [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)

## Aufgabe

Wir haben eine Aufgabe zum Erstellen einer Info-Seite über unser Produkt. Dieser soll neben der Information über das Produkt auch Information über unser Team enthalten.

### 1. Schritt: Vue.js installieren

Vue.js basiert auf JavaScript. JavaScript hat einen Paketmanager mit dem Namen npm. Npm ist vergleichbar mit pip für python. Alle öffentlich verfügbare Paketmanager findet man unter https://www.npmjs.com/.

Mit folgendem Befehl lässt sich Grundgerüst für Vue.js erstellen.

````shell
$ npm init vite@latest vue-app -- --template vue
````

Wenn anschließend alle Pakete mit `npm install` installiert sind, kann man mit dem Befehl `npm run dev` lokal ein Server starten Danach ist die Seite unter http://localhost:3000/ erreichbar.

#### Wieso "npm run dev"?

Npm run xxx ist ein Alias für ein Befehl, der unter `scripts` in der `package.json` Datei definiert ist.

### 2. Schritt: Quasar installieren

Da wir für unsere Seite das Quasar-Framework verwenden wollen, installieren wir als Nächstes Quasar.

````shell
$ npm install quasar @quasar/extras
$ npm install -D @quasar/vite-plugin sass@1.32.0
````

Anschließend müssen wir Anpassungen an unserem Code machen, damit das Framework geladen wird.

*src/main.js*: Quasar initialisieren.

````js
...
// Import Quasar components
import { Quasar } from 'quasar'
// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'
// Import Quasar css
import 'quasar/src/css/index.sass'
...
app.use(Quasar, {
  plugins: {},
})
...
````

*vite.config.js*: [Vite-Bundler](https://www.npmjs.com/package/vite) entsprechend konfigurieren.

````js
...
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'
...
export default defineConfig({
  plugins: [
    vue({
      template: { transformAssetUrls }
    }),
    quasar({
      sassVariables: 'src/quasar-variables.sass'
    })
  ]
})
````

*src/quasar-variables.sass*: Quasars Standardfarben überschreiben.

````sass
$primary   : #1976D2
$secondary : #26A69A
$accent    : #9C27B0

$dark      : #1D1D1D

$positive  : #21BA45
$negative  : #C10015
$info      : #31CCEC
$warning   : #F2C037
````

Mehr Informationen zu der Installation findet man [hier](https://quasar.dev/start/vite-plugin).

### 3. Schritt: Layout konfigurieren

Quasar bitten ein [Layout Builder](https://quasar.dev/layout-builder) an, mit dem man das Layout sehr einfach konfigurieren kann. Hierfür kopieren wir den Code in die `src/App.vue` Datei.

### 4. Schritt: Quasar Komponenten

Bei dieser Aufgabe gehet es darum, wie man die Quasar-Komponenten einbindet.

1.
    Auf der Startseite wollen wir Information über unser Produkt anzeigen. Hier für brauchen wir ein Slide/Carousel. Dafür gibt es in Quasar den [QCarousel Component](https://quasar.dev/vue-components/carousel). Binde diesen auf der Startseite ein.

2.
    Als zweite Feature auf der Startseite wollen wir einen einfachen "Bot" einbinden, der die Ja/Nein-Fragen der Besucher beantwortet. Hier für verwenden wir [QInput](https://quasar.dev/vue-components/input) von Quasar als ein Eingabefeld für die Frage.

    ````html
    <h2>Ask a yes/no question about our company</h2>
    <p><q-input outlined v-model="question" :dense="true" /></p>
    <p>Answer: <span class="answer">{{ answer }}</span></p>
    ````

    Folgender JavaScript-Code soll den Bot simulieren.

    ````html
    <script>
    export default {
      data () {
          return {
            question: '',
            answer: 'Questions usually contain a question mark. ;-)',
          };
      },
      watch: {
        // whenever question changes, this function will run
        question(newQuestion) {
          if (newQuestion.indexOf('?') > -1) {
            this.answer = (Math.random() < 0.5) ? 'No' : 'Yes';
          } else {
            this.answer = 'Questions usually contain a question mark. ;-)';
          }
        },
      },
    }
    </script>
    ````

### 5. Schritt: Router konfigurieren

Damit wir mehrere Seiten in der App implementieren können, brauchen wir eine [vue-router](https://www.npmjs.com/package/vue-router) Erweiterung.

````shell
$ npm install vue-router
````

*src/main.js*: Vue-router Erweiterung initialisieren.

````js
...
import router from './router'
...
app.use(router)
````

*src/router/index.js*: Router mit einer Startseite definieren.

````js
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            label: 'Home',
            component: HomeView
        },
    ]
})

export default router
````

*src/views/Home.vue*: Inhalt der Home-Seite einfügen.

````html
<template>
  <main>
    <h1>Quasar</h1>
    <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
  </main>
</template>
````

Für das Menü wollen wir ein Quasar-Komponent ([drawer](https://quasar.dev/layout/drawer)) verwenden.

*src/App.vue*

Menü einfügen.

````html
<q-list>
  <template v-for="(menuItem, index) in this.$router.options.routes" :key="index">
    <q-item :to="menuItem.path" clickable :active="menuItem.path === this.$router.currentRoute" v-ripple>
      <q-item-section>
        {{ menuItem.label }}
      </q-item-section>
    </q-item>
  </template>
</q-list>
````

Inhalt der Seite anzeigen.

````html
<q-page-container>
  <q-page padding>
    <router-view />
  </q-page>
</q-page-container>
````

### 6. Schritt: About-Seite einfügen

Um unser Produkt besser zu promoten, wollen wir eine "Über uns" Seite haben, unser Team präsentiert wird.

1.
    Als Erstes brauchen wir eine neue Seite. Dazu müssen wir nur Router-Konfiguration erweitern und eine neue View anlegen.

    *src/router/index.js*

    ````js
    ...
    import AboutView from '../views/About.vue'
    ...
    const router = createRouter({
        history: createWebHistory(import.meta.env.BASE_URL),
        routes: [
            ...
            {
                path: '/about',
                name: 'about',
                label: 'About',
                component: AboutView,
            },
        ],
    })
    ...
    ````

    *src/views/About.vue*

    ````html
    <template>
      <main>
        <h1>Our team</h1>
        <div class="item">
          <q-avatar size="100px">
            <img src="https://reqres.in/img/faces/1-image.jpg" alt="George Bluth" />
          </q-avatar>
          <p class="text-overline">George Bluth</p>
        </div>
      </main>
    </template>

    <style>
    .item {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 20px;
        padding: 10px;
    }
    </style>
    ````

2.
    Wir haben jetzt eine Seite, auf der alle Entwickler aufgelistet sind. Das Problem bei der Lösung ist, wenn wir einen neuen Entwickler bekommen oder ein Entwickler das Team verlässt, dann müssen wir ziemlich viel Code duplizieren. Was grundsätzlich immer eine schlechte Idee ist. Das heißt, wir wollen jetzt die Information über ein Teammitglied in eine separate Komponente auslagern.

    *src/components/UserCard.vue*

    ````html
    <template>
      <div class="item">
        <q-avatar size="100px">
          <img :src="avatar" :alt="imageAltAttr()" />
        </q-avatar>
        <p class="text-overline">{{ firstName }} {{ lastName }}</p>
      </div>
    </template>

    <script>
    export default {
        props: {
            firstName: String,
            lastName: String,
            avatar: String,
        },
        methods: {
            imageAltAttr() {
                return `${this.firstName} ${this.lastName}`;
            },
        },
    };
    </script>

    <style>
    .item {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 20px;
        padding: 10px;
    }
    </style>

    ````

    *src/views/About.vue*

    ````html
    <script setup>
    import UserCard from './../components/UserCard.vue'
    </script>

    <template>
      <main>
        <h1>Our team</h1>
        <UserCard firstName="George" lastName="Bluth" avatar="https://reqres.in/img/faces/1-image.jpg"/>
      </main>
    </template>
    ````

3.
    Um den Inhalt der Seite noch dynamischer zu machen, können wir Infos über ein Teammitglied über ein [API-Endpoint](https://reqres.in/#console) abfragen und so dynamisch anzeigen.

    Für die Kommunikation mit der API können wir den [axios](https://www.npmjs.com/package/axios)-Client einsetzen.

    ````shell
    $ npm install axios
    ````

    *src/views/About.vue*

    ````html
    <script setup>
    import UserCard from './../components/UserCard.vue'
    </script>

    <template>
      <main>
        <h1>Our team</h1>
        <UserCard
            v-for="item in items"
            v-bind:key="item.id"
            v-bind:firstName="item.first_name"
            v-bind:lastName="item.last_name"
            v-bind:avatar="item.avatar"
          />
      </main>
    </template>

    <script>
    import axios from 'axios';

    export default {
      data () {
          return {
            loading: false,
            error: null,
            items: [],
          };
      },
      mounted() {
        axios
          .get('https://reqres.in/api/users/')
          .then(response => this.items = response.data.data)
          .catch(error => this.error = error)
          .finally(() => this.loading = false);
      },
    };
    </script>
    ````
