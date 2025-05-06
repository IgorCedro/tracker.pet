import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SupabaseService } from '../services/supabase.service';

export const authGuard: CanActivateFn = async (route, state) => {
  console.log('AuthGuard checking access to:', state.url);
  const supabase = inject(SupabaseService);
  const router = inject(Router);

  const { data: { session } } = await supabase.getSession();
  
  if (session?.user) {
    return true; // Permite acesso à rota
  }
  
  // Redireciona para /home se não autenticado
  return router.createUrlTree(['/home']);
};