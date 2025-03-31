import Vuex from 'vuex'

export default new Vuex.Store({
    state: {
        titulo: 'Emergências Médicas',
        equipe: {
            enfermeiro: '',
            socorrista: '',
            medico: '',
            carro: '',
            telefone: '',
            kitDeReanimacao: ''
        },
        enfermeiros: [],
        socorristas: [],
        medicos: [],
        equipamentos: {
            carros: [],
            telefones: [],
            kitsDeReanimacao: []
        }
    },
    getters: {
        totalEnfermeiros(state) {
            return state.enfermeiros.length
        },
        socorristasPorTurno(state) { //closure
            return turno => !turno ? state.socorristas : state.socorristas.filter(s => s.turno === turno)
        },
        totalSocorristas: state => state.socorristas.length,
        totalSocorristasPorTurno: (state, getters) => turno => getters.socorristasPorTurno(turno).length
    },
    mutations: {
        // setItemEquipe: (state, payload) => {
        setItemEquipe: (state, item) => {
            // let item = payload.item
            
            let t = item.tipo
            let d = item.dados

            if(t == 'enfermeiros') state.equipe.enfermeiro = d.nome
            if(t == 'socorristas') state.equipe.socorrista = d.nome
            if(t == 'medicos') state.equipe.medico = d.nome
            if(t == 'carros') state.equipe.carro = d.placa
            if(t == 'telefones') state.equipe.telefone = d.telefone
            if(t == 'kits-de-reanimacao') state.equipe.kitDeReanimacao = d.kit
        },
        setEnfermeiros: (state, payload) => state.enfermeiros = payload,
        setSocorristas: (state, payload) => state.socorristas = payload,
        setMedicos: (state, payload) => state.medicos = payload,
        setCarros: (state, payload) => state.equipamentos.carros = payload,
        setTelefones: (state, payload) => state.equipamentos.telefones = payload,
        setKitsDeReanimacao: (state, payload) => state.equipamentos.kitsDeReanimacao = payload,
        setTitulo: (state, payload) => state.titulo = payload
    },
    actions: {
        fetchEquipamentos(context, { carros, kitsDeReanimacao, telefone}) {
            console.log(payload)
            fetch('http://localhost:3001/equipamentos')
                .then(res => res.json())
                .then(dados => {
                    if(carros) context.commit('setCarros', dados.carros);
                    if(kitsDeReanimacao) context.commit('setKitsDeReanimacao', dados.kitsDeReanimacao);
                    if(telefone) context.commit('setTelefones', dados.telefones);
                })
                .catch(err => console.log(err.message))
        },
        fetchProfissionais(context) {    
            fetch('http://localhost:3001/enfermeiros')
                .then(res => res.json())
                .then(dados => context.commit('setCarros', dados))
                .catch(err => console.log(err.message))
            fetch('http://localhost:3001/socorristas')
                .then(res => res.json())
                .then(dados => context.commit('setKitsDeReanimação', dados))
                .catch(err => console.log(err.message))
            fetch('http://localhost:3001/medicos')
                .then(res => res.json())
                .then(dados => context.commit('setTelefones', dados))
                .catch(err => console.log(err.message))
        }
    }
})