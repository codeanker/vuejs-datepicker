<template>
  <div id="app">
    <h1>Datepicker Examples</h1>
    <div class="example">
      <h3>Typeable datepicker</h3>
      <datepicker
      v-model="model"
      :language="de"
      :format-typed-date="parseDate"
      :disabled-dates="disabledDates"
      typeable
      format="dd.MM.yyyy"/>
    </div>
    <pre>{{ model }}</pre>
  </div>
</template>

<script>
import Datepicker from '../src/components/Datepicker.vue'
import * as lang from '../src/locale/index.js'

const state = {
  date1: new Date()
}

export default {
  name: 'demo',
  components: {
    Datepicker
  },
  data () {
    return {
      model: null,
      disabledDates: {
        from: new Date()
      },
    }
  },
  methods: {
    parseDate (dateStr) {
      if (!dateStr) return
      let [day, month, year] = dateStr.split('.')
      if (!day || !month || !year) return
      return new Date(year, month - 1, day).toISOString()
    }
  }
}
</script>

<style>

@import url('https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css');

body {
    font-family: 'Helvetica Neue Light', Helvetica, sans-serif;
    padding: 1em 2em 2em;
}
input, select {
    padding: .75em .5em;
    font-size: 100%;
    border: 1px solid #ccc;
    width: 100%
}

select {
    height: 2.5em;
}

.example {
    background: #f2f2f2;
    border: 1px solid #ddd;
    padding: 0em 1em 1em;
    margin-bottom: 2em;
}

code,
pre {
    margin: 1em 0;
    padding: 1em;
    border: 1px solid #bbb;
    display: block;
    background: #ddd;
    border-radius: 3px;
}

.settings {
    margin: 2em 0;
    border-top : 1px solid #bbb;
    background: #eee;
}

h5 {
    font-size:100%;
    padding: 0;
}

.form-group {
    margin-bottom: 1em;
}

.form-group label {
    font-size: 80%;
    display: block;
}
</style>
