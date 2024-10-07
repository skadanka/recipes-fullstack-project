<template>
  <div class="container">
    <h1 class="title">Register</h1>
    <b-form @submit.prevent="onRegister" @reset="onReset">
      <b-form-group
        id="input-group-username"
        label-cols-sm="3"
        label="Username:"
        label-for="username"
      >
        <b-form-input
          id="username"
          v-model="$v.form.username.$model"
          type="text"
          :state="validateState('username')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.username.required">
          Username is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-else-if="!$v.form.username.length">
          Username length should be between 3-8 characters long
        </b-form-invalid-feedback>
        <b-form-invalid-feedback v-if="!$v.form.username.alpha">
          Username alpha
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-country"
        label-cols-sm="3"
        label="Country:"
        label-for="country"
      >
        <b-form-select
          id="country"
          v-model="$v.form.country.$model"
          :options="countries"
          :state="validateState('country')"
        ></b-form-select>
        <b-form-invalid-feedback>
          Country is required
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group 
        id="input-group-firstName"
        label-cols-sm="3"
        label="First name:"
        label-for="firstName" >
        <b-form-input
          id="Firstname"
          v-model="$v.form.firstName.$model"
          type="text"
          :state="validateState('firstName')">
        </b-form-input>
        <b-form-invalid-feedback  v-if="$v.form.firstName.required && !$v.form.firstName.alpha">
          Firstname contains only letters
        </b-form-invalid-feedback>  
      </b-form-group>

      <b-form-group 
        id="input-group-lastName"
        label-cols-sm="3"
        label="Lastname:"
        label-for="lastName" >
        <b-form-input
          id="lastName"
          v-model="$v.form.lastName.$model"
          type="text"
          :state="validateState('lastName')">
        </b-form-input>
        <b-form-invalid-feedback  v-if="$v.form.lastName.required && !$v.form.lastName.alpha">
          Lastname contains only letters
        </b-form-invalid-feedback>  
      </b-form-group>
      <b-form-group
        id="input-group-Password"
        label-cols-sm="3"
        label="Password:"
        label-for="password"
      >

        <b-form-input
          id="password"
          type="password"
          v-model="$v.form.password.$model"
          :state="validateState('password')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.password.required">
          Password is required
        </b-form-invalid-feedback>
        <b-form-text v-else-if="$v.form.password.$error" text-variant="info">
          Your password should be <strong>strong</strong>. <br />
          For that, your password should be also:
        </b-form-text>
        <b-form-invalid-feedback
          v-if="$v.form.password.required && !$v.form.password.length"
        >
          Have length between 5-10 characters long
        </b-form-invalid-feedback>
        <b-form-invalid-feedback 
          v-if="!$v.form.password.strength"
          >
            contain: number, letter, special characters
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group
        id="input-group-confirmedPassword"
        label-cols-sm="3"
        label="Confirm Password:"
        label-for="confirmedPassword"
      >
        <b-form-input
          id="confirmedPassword"
          type="password"
          v-model="$v.form.confirmedPassword.$model"
          :state="validateState('confirmedPassword')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.confirmedPassword.required">
          Password confirmation is required
        </b-form-invalid-feedback>
        <b-form-invalid-feedback
          v-else-if="!$v.form.confirmedPassword.sameAsPassword"
        >
          The confirmed password is not equal to the original password
        </b-form-invalid-feedback>
      </b-form-group>
      
      <b-form-group 
        id="input-group-Email"
        label-cols-sm="3"
        label="Email Address: "
        label-for="emailAddress"
        >
        <b-form-input 
          id="emailAddress"
          v-model="$v.form.email.$model"
          type="email"
          name="email"
          autocomplete="email"
          :state="validateState('email')"
          >
          <b-form-invalid-feedback v-if="$v.form.email.emailValidation">
              example@email.com
          </b-form-invalid-feedback>

        </b-form-input>

      </b-form-group>
      <div class="btn-container">
        <b-button type="reset" class='reset-btn' variant="danger">Reset</b-button>
        <b-button
          type="submit"
          variant="primary"
          class="ml-5 w-75 register-btn"
          >Register</b-button
        >
      </div>
      <div class="mt-2">
        You have an account already?
        <router-link to="login"> Log in here</router-link>
      </div>
    </b-form>
    <b-alert
      class="mt-2"
      v-if="form.submitError"
      variant="warning"
      dismissible
      show
    >
      Register failed: {{ form.submitError }}
    </b-alert>
    <!-- <b-card class="mt-3 md-3" header="Form Data Result">
      <pre class="m-0"><strong>form:</strong> {{ form }}</pre>
      <pre class="m-0"><strong>$v.form:</strong> {{ $v.form }}</pre>
    </b-card> -->
  </div>
</template>

<script>
import countries from "../assets/countries";
import {
  required,
  minLength,
  maxLength,
  alpha,
  sameAs,
  email
} from "vuelidate/lib/validators";

export default {
  name: "Register",
  data() {
    return {
      form: {
        username: "",
        firstName: "",
        lastName: "",
        country: null,
        password: "",
        confirmedPassword: "",
        email: "",
        submitError: undefined
      },
      countries: [{ value: null, text: "", disabled: true }],
      errors: [],
      validated: false
    };
  },
  validations: {
    form: {
      username: {
        required,
        length: (u) => minLength(3)(u) && maxLength(8)(u),
        alpha
      },
      country: {
        required
      },
      firstName: {
        required,
        alpha
      },
      lastName: {
        required,
        alpha
      },
      email : {
        required,
        emailValidation: (e) => {
          if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e)) {
            return true;
          } else {
            return false;
          }
        }
      },
      password: {
        required,
        length: (p) => minLength(5)(p) && maxLength(10)(p),
        strength: (p) => /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]/.test(p)
      },
      confirmedPassword: {
        required,
        sameAsPassword: sameAs("password")
      }
    }
  },
  mounted() {
    // console.log("mounted");
    this.countries.push(...countries);
    // console.log($v);
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },

    async Register() {
      try {
        const response = await this.axios.post(
          // "https://test-for-3-2.herokuapp.com/user/Register",
          this.$root.store.server_domain + "/Register",

          {
            username: this.form.username,
            password: this.form.password,
            firstname: this.form.firstName,
            lastname: this.form.lastName,
            email: this.form.email,
            profilePic: '👨‍🍳'
          }
        );
        this.$router.push("/login");
      } catch (err) {
        console.log(err.response);
        this.form.submitError = err.response.data.message;
      }
    },
    onRegister() {
      console.log("register method called");
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      console.log("register method go");
      this.Register();
    },
    onReset() {
      this.form = {
        username: "",
        firstName: "",
        lastName: "",
        country: null,
        password: "",
        confirmedPassword: "",
        email: ""
      };
      this.$nextTick(() => {
        this.$v.$reset();
      });
    }
  }
};
</script>
<style lang="scss" scoped>

/* Container for the register form */
.container {
  max-width: 500px;
  margin: 0 auto;
  padding: 2rem;
  background-color: $card-background; /* Assuming a global variable for card background */
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* Soft shadow for depth */
}

/* Form Title */
.title {
  font-size: 2rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 1.5rem;
  color: $primary-color; /* Primary color for title */
}

/* Form Input Group Styling */
#input-group-username,
#input-group-country,
#input-group-firstName,
#input-group-lastName,
#input-group-Password,
#input-group-confirmedPassword,
#input-group-Email {
  margin-bottom: 1.25rem;
}

/* Input Fields */
b-form-input,
b-form-select {
  border-radius: 8px;
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid $divider-color;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &:focus {
    border-color: $primary-color;
    box-shadow: 0 0 0 0.2rem rgba($primary-color, 0.25);
  }
}

/* Form Feedback */
b-form-invalid-feedback {
  color: $danger-color; /* Danger color for error messages */
  font-size: 0.85rem;
  margin-top: 0.5rem;
}

b-form-text {
  color: $text-color;
}

/* Buttons */
b-button {
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  font-size: 1rem;
  border-radius: 8px;
  transition: background-color 0.3s ease, transform 0.2s ease;

}
  .register-btn {
    background-color: $primary-color;
    border-color: $primary-color;
    width: 100%;

    &:hover {
      background-color: $primary-hover;
      transform: translateY(-2px); /* Lift effect on hover */
    }
  }

.reset-btn {
  background-color: $danger-color;
  border-color: $danger-color;
  
  &:hover {
    background-color: darken($danger-color, 5%);
  }
}


.btn-container {
  display: flex;
  align-items: end;
}
/* Reset and Submit Buttons */
.ml-5 {
  margin-left: 0;
  margin-top: 1rem;
}

/* Alert */
b-alert {
  font-size: 0.95rem;
  margin-top: 1rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .container {
    padding: 1rem;
  }

  .title {
    font-size: 1.75rem;
  }
}

</style>

