import SourcesQuery from '~/graphql/Posters/Sources.gql'
import SubjectsQuery from '~/graphql/Posters/Subjects.gql'

export const state = () => ({
  all: [],
  selectedTags: [],
  search: '',
  dateBefore: null,
  dateAfter: null,
})

export const getters = {
  isSelected: (state) => (tagId) => {
    return state.selectedTags.find(
      (selectedTag) => selectedTag.node.databaseId === tagId,
    )
  },
  sources: (state) => {
    return state.all.filter((tag) => tag.node.taxonomy.node.name === 'source')
  },
  subjects: (state) => {
    return state.all.filter((tag) => tag.node.taxonomy.node.name === 'subject')
  },
  selectedSourceIds: (state) => {
    const sources = state.selectedTags.filter(
      (tag) => tag.node.taxonomy.node.name === 'source',
    )
    return sources.map((subject) => subject.node.databaseId)
  },
  selectedSubjectIds: (state) => {
    const subjects = state.selectedTags.filter(
      (tag) => tag.node.taxonomy.node.name === 'subject',
    )
    return subjects.map((subject) => subject.node.databaseId)
  },
}

export const mutations = {
  search: (state, payload) => {
    state.search = payload
  },
  updatedateBefore: (state, payload) => {
    state.dateBefore = payload
  },
  updatedateAfter: (state, payload) => {
    state.dateAfter = payload
  },
  add: (state, payload) => {
    state.selectedTags.push(payload)
  },
  remove: (state, payload) => {
    const selectedTags = [...state.selectedTags]
    state.selectedTags = selectedTags.filter(
      (selectedTag) => selectedTag.node.databaseId !== payload,
    )
  },
  set: (state, payload) => {
    state.all = payload
  },
}

export const actions = {
  search: ({ commit }, payload) => {
    commit('search', payload)
  },
  updatedateBefore: ({ commit }, payload) => {
    commit('updatedateBefore', payload)
  },
  updatedateAfter: ({ commit }, payload) => {
    commit('updatedateAfter', payload)
  },
  add: ({ commit }, payload) => {
    commit('add', payload)
  },
  remove: ({ commit }, payload) => {
    commit('remove', payload)
  },
  async set({ commit }, context) {
    const responseSources = await context.app.apolloProvider.defaultClient.query(
      {
        query: SourcesQuery,
      },
    )
    const responseSubjects = await context.app.apolloProvider.defaultClient.query(
      {
        query: SubjectsQuery,
      },
    )
    commit('set', [
      ...responseSources.data.sources.edges,
      ...responseSubjects.data.subjects.edges,
    ])
    const nationalSeries = responseSources.data.sources.edges.find(
      (source) => source.node.databaseId === 28,
    )
    commit('add', nationalSeries)
  },
}
