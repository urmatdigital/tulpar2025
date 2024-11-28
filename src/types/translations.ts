export type TranslationKey =
  | 'navigation.trackPackage'
  | 'navigation.services'
  | 'navigation.about'
  | 'navigation.contact'
  | 'navigation.menu'
  | 'auth.signIn'
  | 'auth.signOut'
  | 'auth.email'
  | 'auth.password'
  | 'auth.forgotPassword'
  | 'auth.noAccount'
  | 'auth.createAccount'
  | 'auth.hasAccount'
  | 'auth.loginHere'
  | 'theme.light'
  | 'theme.dark'
  | 'theme.system'
  | 'home.hero.title'
  | 'home.hero.subtitle'
  | 'home.hero.cta'
  | 'home.features.tracking.title'
  | 'home.features.tracking.description'
  | 'home.features.global.title'
  | 'home.features.global.description'
  | 'home.features.support.title'
  | 'home.features.support.description'
  | 'stats.deliveries'
  | 'stats.countries'
  | 'stats.clients'
  | 'stats.satisfaction'
  | 'dashboard.stats.title'
  | 'dashboard.stats.users'
  | 'dashboard.stats.projects'
  | 'dashboard.stats.tasks';

export interface Translations {
  auth: {
    signIn: string
    createAccount: string
    email: string
    password: string
    hasAccount: string
    noAccount: string
  }
  theme: {
    light: string
    dark: string
    system: string
  }
  home: {
    hero: {
      title: string
      description: string
    }
    features: {
      title: string
      list: string[]
    }
  }
  dashboard: {
    stats: {
      title: string
      users: string
      projects: string
      tasks: string
    }
  }
}
