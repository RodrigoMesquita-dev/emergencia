<template>
    <div class="row">
        <div class="col-1" v-if="dados.id" v-text="dados.id"></div>
        <div class="col" v-if="dados.nome" v-text="dados.nome"></div>
        <div class="col" v-if="dados.placa" v-text="dados.placa"></div>
        <div class="col" v-if="dados.telefone" v-text="dados.telefone"></div>
        <div class="col" v-if="dados.kit" v-text="dados.kit"></div>
        <div class="col-2" v-if="dados.escala" v-text="dados.escala"></div>
        <div class="col-2" v-if="dados.turno" v-text="dados.turno"></div>
        <div class="col-1">
            <i 
                class="bi-check2-square" 
                style="cursor: pointer"
                @click="adicionarItemEquipe"
            ></i>
        </div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
    name: 'Item',
    props: {
        dados: Object,
        tipo: String
    },
    methods: {
        // ...mapMutations(['setItemEquipe']),
        ...mapMutations({
          x: 'setItemEquipe',
          setItemEquipeComVerificacao: (commit, payload) => {
            // camada de logica
            commit('setItemEquipe', payload);
          }
        }),
        adicionarItemEquipe() {
            let item = {
                tipo: this.tipo,
                dados: this.dados
            }

            // this.$store.commit('setItemEquipe', item)
            // this.$store.commit({
            //   type: 'setItemEquipe',
            //   item,
            //   })
            // this.setItemEquipe({ item });
            // this.x({ item });
            this.setItemEquipeComVerificacao(item);
        },
        adicionarItemEquipeAbordagemIncorreta() {

            //a abordagem incorreta
            let t = this.tipo
            let d = this.dados

            t == 'enfermeiros' ? this.$store.state.equipe.enfermeiro = d.nome : null
            t == 'socorristas' ? this.$store.state.equipe.socorrista = d.nome : null
            t == 'medicos' ? this.$store.state.equipe.medico = d.nome : null
            t == 'carros' ? this.$store.state.equipe.carro = d.placa : null
            t == 'telefones' ? this.$store.state.equipe.telefone = d.telefone : null
            t == 'kits-de-reanimacao' ? this.$store.state.equipe.kitDeReanimacao = d.kit : null
        }
    }
}
</script>