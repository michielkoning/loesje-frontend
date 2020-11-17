import { computed } from '@nuxtjs/composition-api'
import { useQuery, useResult } from '@vue/apollo-composable'
import PostersQuery from '~/graphql/Posters/Posters.gql'
import PosterQuery from '~/graphql/Posters/Poster.gql'

export const usePosters = ({
  first = 20,
  search = null,
  dateBefore = null,
  dateAfter = null,
  notIn = 0,
  posterIds = [],
  subjects = [],
  sources = [],
} = {}) => {
  const where = computed(() => {
    const subjectList = subjects.value ? subjects.value : subjects
    const sourcesList = sources.value ? sources.value : sources

    if (posterIds.length) {
      return {
        in: posterIds,
      }
    }
    const taxQuery = {
      taxArray: [],
    }
    if (subjectList.length) {
      taxQuery.taxArray.push({
        terms: subjectList.map(String),
        taxonomy: 'SUBJECT',
        operator: 'IN',
      })
    }
    if (sourcesList.length) {
      taxQuery.taxArray.push({
        terms: sourcesList.map(String),
        taxonomy: 'SOURCE',
        operator: 'IN',
      })
    }
    let posterDateAfter = null
    if (dateAfter?.value) {
      const splittedDate = dateAfter.value.split('-')
      posterDateAfter = {
        year: parseInt(splittedDate[0], 10),
        month: parseInt(splittedDate[1], 10),
        day: parseInt(splittedDate[2], 10),
      }
    }
    let posterDateBefore = null
    if (dateBefore?.value) {
      const splittedDate = dateBefore.value.split('-')
      posterDateBefore = {
        year: parseInt(splittedDate[0], 10),
        month: parseInt(splittedDate[1], 10),
        day: parseInt(splittedDate[2], 10),
      }
    }
    return {
      notIn,
      search: search?.value ? search.value : search,
      taxQuery: taxQuery.taxArray.length ? taxQuery : null,
      posterDateBefore,
      posterDateAfter,
    }
  })

  const { result, error, loading, fetchMore } = useQuery(
    PostersQuery,
    {
      first,
      where,
    },
    {
      notifyOnNetworkStatusChange: true,
    },
  )

  const posters = useResult(result)

  const loadMore = async () => {
    const { endCursor } = posters.value.pageInfo
    await fetchMore({
      variables: {
        after: endCursor,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        return {
          ...previousResult,
          posters: {
            ...previousResult.posters,
            pageInfo: fetchMoreResult.posters.pageInfo,
            edges: [
              ...previousResult.posters.edges,
              ...fetchMoreResult.posters.edges,
            ],
          },
        }
      },
    })
  }

  const hasNextPage = computed(() => {
    if (!posters.value) return true
    return posters.value.pageInfo.hasNextPage
  })

  return {
    posters,
    error,
    loading,
    loadMore,
    hasNextPage,
  }
}

export const usePoster = (slug) => {
  const { result, error, loading } = useQuery(PosterQuery, {
    slug,
  })

  const poster = useResult(result)

  return {
    poster,
    error,
    loading,
  }
}
