// Simple test utility for testing registration endpoint
export async function testRegistration(email: string, password: string) {
  try {
    console.log('🧪 Testing registration with:', { email, password })

    const response = await fetch(`${process.env.API_URL}/api/v1/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })

    console.log('📊 Response status:', response.status)
    console.log('📋 Response headers:', Object.fromEntries(response.headers.entries()))

    if (!response.ok) {
      const errorText = await response.text()
      console.error('❌ Error response:', errorText)

      // Try to parse as JSON for better error message
      try {
        const errorJson = JSON.parse(errorText)
        console.error('📝 Parsed error:', errorJson)
        return { success: false, error: errorJson.message || errorText, status: response.status }
      } catch {
        return { success: false, error: errorText, status: response.status }
      }
    }

    const data = await response.json()
    console.log('✅ Success response:', data)
    return { success: true, data, status: response.status }
  } catch (error) {
    console.error('💥 Network error:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Network error' }
  }
}

// Interactive test function
export function runRegistrationTest() {
  const email = prompt('Enter email for registration test:')
  const password = prompt('Enter password for registration test:')

  if (email && password) {
    testRegistration(email, password)
      .then(result => {
        if (result.success) {
          console.log('🎉 Registration test successful!', result.data)
          alert('Registration test successful! Check console for details.')
        } else {
          console.error('💔 Registration test failed:', result.error)
          alert(`Registration test failed: ${result.error}`)
        }
      })
  } else {
    console.log('❌ Test cancelled - no email or password provided')
  }
}

// Make functions available globally for easy testing
if (typeof window !== 'undefined') {
  // Use type assertion to avoid TypeScript errors
  const globalWindow = window as unknown as Record<string, unknown>
  globalWindow.testRegistration = testRegistration
  globalWindow.runRegistrationTest = runRegistrationTest

  console.log('🧪 Registration test functions available:')
  console.log('- runRegistrationTest() - Interactive test')
  console.log('- testRegistration("email@example.com", "password") - Direct test')
}
