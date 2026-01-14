import { useRouter } from 'next/navigation'

export default function RedirectPage() {
  const router = useRouter()

  router.replace('/mk') 

  return null
}
