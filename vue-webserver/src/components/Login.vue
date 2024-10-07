<template>
    <div class="login-body">
      <div class="container">
        <h1 class="title">Login</h1>
        <b-form @submit.prevent="onLogin">
          <b-form-group
            id="input-group-Username"
            label-cols-sm="3"
            label="Username:"
            label-for="Username"
          >
            <b-form-input
              id="Username"
              v-model="$v.form.username.$model"
              type="text"
              :state="validateState('username')"
            ></b-form-input>
            <b-form-invalid-feedback>
              Username is required
            </b-form-invalid-feedback>
          </b-form-group>
  
          <b-form-group
            id="input-group-Password"
            label-cols-sm="3"
            label="Password:"
            label-for="Password"
          >
            <b-form-input
              id="Password"
              type="password"
              v-model="$v.form.password.$model"
              :state="validateState('password')"
            ></b-form-input>
            <b-form-invalid-feedback>
              Password is required
            </b-form-invalid-feedback>
          </b-form-group>
  
          <b-button
            type="submit"
            variant="primary"
            class="mx-auto w-100 button-main"
            >Login</b-button
          >
          <div class="mt-2">
            Do not have an account yet?
            <router-link to="register"> Register in here</router-link>
          </div>
        </b-form>
        <b-alert
          class="mt-2"
          v-if="form.submitError"
          variant="warning"
          dismissible
          show
        >
          Login failed: {{ form.submitError }}
        </b-alert>
        <!-- <b-card class="mt-3" header="Form Data Result">
          <pre class="m-0">{{ form }}</pre>
        </b-card> -->
      </div>
    </div>
</template>

<script>
 import { required } from "vuelidate/lib/validators";
  export default {
    name: "Login",
    data() {
      return {
        form: {
          username: "",
          password: "",
          submitError: undefined
        }
      };
    },
    validations: {
      form: {
        username: {
          required
        },
        password: {
          required
        }
      }
    },
    methods: {
      validateState(param) {
        const { $dirty, $error } = this.$v.form[param];
        return $dirty ? !$error : null;
      },
      async Login() {
        try {
          
          const response = await this.axios.post(
            // "https://test-for-3-2.herokuapp.com/user/Login",
            this.$root.store.server_domain +"/Login",
            // "http://132.72.65.211:80/Login",
            // "http://132.73.84.100:80/Login",
  
            {
              username: this.form.username,
              password: this.form.password
            }
          );
          // console.log(response);
          // this.$root.loggedIn = true;
          this.$root.store.login(this.form.username);
          this.$router.push("/");
        } catch (err) {
          console.log(err.response);
          this.form.submitError = err.response.data.message;
        }
      },
      onLogin() {
        // console.log("login method called");
        this.form.submitError = undefined;
        this.$v.form.$touch();
        if (this.$v.form.$anyError) {
          return;
        }
        // console.log("login method go");
  
        this.Login();
      }
    }
  };
</script>

<style lang="scss" scoped>

/* Body Wrapper */
.login-body {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: $background-color; /* Neutral background for the login page */
  padding: 2rem;
}

/* Form Container */
.container {
  max-width: 400px;
  background-color: $card-background; /* White card background */
  border-radius: 12px; /* Modern rounded corners */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* Subtle shadow for elevation */
  padding: 2rem;
  text-align: center;
}

/* Form Title */
.title {
  font-size: 2rem;
  font-weight: 600;
  color: $primary-color;
  margin-bottom: 2rem;
}

/* Form Inputs */
b-form-group {
  margin-bottom: 1.5rem;
}

b-form-input {
  border-radius: 8px; /* Rounded input fields */
  border: 1px solid $divider-color; /* Subtle border */
  padding: 0.8rem;
  font-size: 1rem;

  &:focus {
    border-color: $primary-color;
    box-shadow: 0 0 0 0.2rem rgba(33, 150, 243, 0.25); /* Highlight input on focus */
  }
}

/* Error Message */
b-form-invalid-feedback {
  color: $error-color; /* Red for errors */
  font-size: 0.875rem;
}

/* Login Button */
.button-main {
  background-color: $primary-color;
  color: $card-background; /* White text on button */
  border-radius: 8px;
  font-weight: 600;
  padding: 10px 20px;
  width: 100%;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: $primary-hover;
    transform: translateY(-3px); /* Subtle lift on hover */
  }
}

/* Register Link */
.router-link {
  display: inline-block;
  color: $secondary-color;
  font-weight: 600;
  margin-top: 1rem;
  transition: color 0.3s ease;

  &:hover {
    color: $primary-hover; /* Change color on hover */
  }
}

/* Alert Box for Login Error */
b-alert {
  border-radius: 8px;
  font-size: 0.875rem;
}

</style>
