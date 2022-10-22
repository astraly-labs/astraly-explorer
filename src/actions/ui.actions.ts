import UiConstants, { PAGES, PageTitles } from '../constants/ui.constants'

const UiActions = {
  setPage(page?: PAGES) {
    const heading: any = {
      isHome: false,
      isProject: false,
      page,
      // @ts-ignore
      title: page ? PageTitles[page] : '',
    }

    // @ts-ignore
    console.log(PageTitles[page], page)

    if (page === PAGES.HOME) {
      heading.isHome = true
    }

    return (dispatch: any) => {
      dispatch({
        type: UiConstants.SET_PAGE,
        heading,
      })
    }
  },
}

export default UiActions
