import { useLocation, useNavigate } from 'react-router-dom'

const useSearchParams = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const getSearchParams = (): URLSearchParams => {
    return new URLSearchParams(location.search)
  }

  const setSearchParams = (params: Record<string, string | number | boolean>): void => {
    const stringifiedParams: Record<string, string> = Object.fromEntries(
      Object.entries(params).map(([key, value]) => [key, String(value)])
    )

    const searchParams = new URLSearchParams(stringifiedParams).toString()
    navigate(`?${searchParams}`)
  }

  return { getSearchParams, setSearchParams }
}

export default useSearchParams
