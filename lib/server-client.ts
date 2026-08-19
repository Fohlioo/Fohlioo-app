
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';


function getEnvironmentVariable() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error('Missing environment variables');
    }
    if (supabaseAnonKey.startsWith('sb_secret_')) {
        throw new Error(
            'NEXT_PUBLIC_SUPABASE_ANON_KEY must be the publishable/anon key, not the secret key'
        );
    }
    return { supabaseUrl, supabaseAnonKey };
}

export async function createSupabaseServerClient() {
    const { supabaseUrl, supabaseAnonKey } = getEnvironmentVariable();
    const cookieStore = await cookies();

    return createServerClient(supabaseUrl, supabaseAnonKey, {
        cookies: {
            getAll(){
                return cookieStore.getAll();
            },
            setAll(cookiesToSet){
                try{
                    cookiesToSet.forEach(({ name, value, options }) => {
                        cookieStore.set(name, value, options);
                    })
                }catch(error){
                    console.error('Error setting cookies:', error);
                }
            }
        }
    })
}