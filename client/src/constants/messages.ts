export const RULES = {
  email: {
    required: {
      message: 'Email is required'
    },
    regex: {
      message: 'Email invalid',
      pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
    }
  },
  password: {
    required: {
      message: 'Password is required'
    },
    minLength: {
      length: 6,
      message: 'Password must have least 6 characters'
    }
  },
  firstName: {
    required: {
      message: 'First Name is required'
    }
  },
  lastName: {
    required: {
      message: 'Last Name is required'
    }
  },
  hash: {
    required: {
      message: 'Code is required'
    }
  },
  role: {
    required: {
      message: 'Role is required'
    }
  }
}
