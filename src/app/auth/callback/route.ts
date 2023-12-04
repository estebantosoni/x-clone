import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse, type NextRequest } from "next/server"

// opcion de next para evitar que cachee de forma estatica la ruta y que siempre se ejecute en el servidor
export const dynamic = "force-dynamic"

// para crear endpoints para la API de Next, se debe crear un route.ts
export async function GET(request: NextRequest) {
  
  // cuando el usuario es redireccionado, se le envía un codigo por URL, el cual debe ser tomado para poder acceder
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")

  if (code !== null) {
    // crear un cliente
    const supabase = createRouteHandlerClient({ cookies })
    // mediante "code" se devuelve la sesión del usuario
    await supabase.auth.exchangeCodeForSession(code)
  }

  // por defecto se puede redirigir al usuario a home mediante "/"
  // sino es devuelto al origen, el cual varía segun donde haya estado parado el usuario (antes de la redirección)
  return NextResponse.redirect(requestUrl.origin)
}

