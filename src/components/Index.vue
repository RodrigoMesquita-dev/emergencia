<template>
  <div>
    
    <nav class="navbar navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">{{ tituloCustomizado }}</a>
      </div>
    </nav>

    <div class="container">

      <div class="row mt-5">
        <div class="col-6 p">
          <profissionais />
        </div>

        <div class="col-6">
          <equipamentos />
        </div>
      </div>

      <div class="row mt-5 mb-5 bg-light p-2">
        <div class="col">
          <configuracao-equipe />
        </div>
      </div>

      <div class="row mt-5 mb-5">
        <div class="col">
          <equipes />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ConfiguracaoEquipe from './ConfiguracaoEquipe.vue'
import Equipamentos from './Equipamentos.vue'
import Equipes from './Equipes.vue'
import Profissionais from './Profissionais.vue'
import { mapMutations } from 'vuex'

export default {
  components: { 
    ConfiguracaoEquipe,
    Equipamentos,
    Equipes,
    Profissionais
  },
  name: 'Index',
  props: {
    msg: String
  },
  computed: {
    tituloCustomizado() {
      return `.: ${this.$store.state.titulo}`
    }
  },
  methods: {
    ...mapMutations(['setEnfermeiros', 'setSocorristas', 'setMedicos' ])
  },
  created() {
    fetch('http://localhost:3001/enfermeiros')
      .then(res => res.json())
      .then(dados => this.setEnfermeiros(dados))
      .catch(err => console.log(err.message))
    fetch('http://localhost:3001/socorristas')
      .then(res => res.json())
      .then(dados => this.setSocorristas(dados))
      .catch(err => console.log(err.message))
    fetch('http://localhost:3001/medicos')
      .then(res => res.json())
      .then(dados => this.setMedicos(dados))
      .catch(err => console.log(err.message))
    fetch('http://localhost:3001/equipamentos')
      .then(res => res.json())
      .then(dados => {
        this.$store.dispatch('adicionarEquipamentos', dados)
      })
      .catch(err => console.log(err.message))
  }
}
</script>
