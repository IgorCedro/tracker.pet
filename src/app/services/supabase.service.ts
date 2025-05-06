import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular'
import { AuthChangeEvent, createClient, Session, SupabaseClient } from '@supabase/supabase-js'
import { environment } from '../../environments/environment';
import { User, AuthError } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
      }
    });
  }

  async signInWithEmail(email: string, password: string) {
    return this.supabase.auth.signInWithPassword({ email, password });
  }

  async signUpWithEmail(
    email: string,
    password: string,
    name: string,
    birthdate: string
  ): Promise<{ user: User }> { // Tipo de retorno explícito
    try {
      // 1. Cadastro no auth
      const { data: { user }, error: authError } = await this.supabase.auth.signUp({
        email,
        password,
        options: { data: { name } }
      });
  
      if (authError) throw authError;
      if (!user) throw new Error('User creation failed');
  
      // 2. Inserção no perfil
      const { error: profileError } = await this.supabase
        .from('profiles')
        .insert({
          id: user.id,
          email,
          name,
          birthdate
        });
  
      if (profileError) throw profileError;
  
      return { user };
    } catch (error) {
      console.error('Signup error:', error);
      throw new Error(
        error instanceof Error ? error.message : 'Unknown error during signup'
      );
    }
  }

  // Método para buscar dados do perfil do usuário
  async getProfile(userId: string) {
    return this.supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
  }

  async signInWithOAuth(provider: 'google' | 'facebook') {
    return this.supabase.auth.signInWithOAuth({ provider });
  }  

  async signOut() {
    return this.supabase.auth.signOut();
  }

  getSession() {
    return this.supabase.auth.getSession();
  }

  getUser() {
    return this.supabase.auth.getUser();
  }

  authChanges(callback: (event: AuthChangeEvent, session: Session | null) => void) {
    return this.supabase.auth.onAuthStateChange(callback);
  }
}

