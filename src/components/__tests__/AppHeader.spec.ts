import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/vue'
import { createRouter, createMemoryHistory } from 'vue-router'
import { router } from '@/router/index' // замініть на вірний шлях
import AppHeader from '@/components/AppHeader.vue'

const router = createRouter({
  history: createMemoryHistory(),
  routes
})

describe('AppHeader', () => {
  it('renders correctly', async () => {
    render(AppHeader, {
      global: {
        plugins: [router]
      }
    })

    expect(screen.getByText('Test task')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /users/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /chart/i })).toBeInTheDocument()
  })

  it('has correct active class for router link', async () => {
    render(AppHeader, {
      global: {
        plugins: [router]
      }
    })

    // Переконайтеся, що ви встановили поточний маршрут у тесті
    await router.push('/users')
    await router.isReady()

    const usersLink = screen.getByRole('link', { name: /users/i })
    expect(usersLink).toHaveClass('router-link-active')
  })
})
