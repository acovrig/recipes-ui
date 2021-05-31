<template>
  <v-container fill-height fluid>
    <v-row align="center" justify="center">
      <v-col>
        <v-card class="mx-auto">
          <v-card-title>
            <h1>Login</h1>
          </v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field
                v-model="email"
                label="Username"
                prepend-icon="mdi-account-circle"
              />
              <v-text-field
                v-model="password"
                :type="showPassword ? 'text' : 'Password'"
                label="Password"
                prepend-icon="mdi-lock"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPassword = !showPassword"
              />
            </v-form>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn
              @click="doLogin()"
              color="success">
              Login or Register
            </v-btn>
            <v-btn to="/">Cancel</v-btn>
          </v-card-actions>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn
              @click="googleLogin()"
              :href="`https://dev-recipes.thecovrigs.net/omniauth/google_oauth2?token=${token}`"
              target="_BLANK"
              color="red"
              block
              dark>
              <v-icon>mdi-google</v-icon>
              <span style="padding-left: 1em;"></span>
              Login with Google
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import config from '@/config';

export default {
  name: 'Login',
  components: {},
  data() {
    return {
      token: '',
      showPassword: false,
      email: 'accovrig@gmail.com',
      password: 'asdf1234',
      emailRules: [
        (value) => !!value || 'Required.',
        (value) => !value || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || 'Valid email required.',
      ],
      passRules: [
        (value) => !!value || 'Required.',
        (value) => (value || '').length >= 8 || 'Minimum 8 characters.',
        (value) => (value || '').length <= 128 || 'Maximum 128 characters.',
      ],
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    auth() {
      return this.$store.getters.auth;
    },
  },
  channels: {
    LoginChannel: {
      connected() {
        console.log('connected to Login');
      },
      rejected() {
        console.error('failed to connect to Login');
      },
      received(data) {
        if (data.user !== undefined && data.auth !== undefined) {
          this.$store.commit('user', data.user);
          this.$store.commit('auth', data.auth);
          this.$router.replace({ name: 'Home' });
        } else if (data.uuid && data.status === 'connected') {
          this.token = data.uuid;
        }
      },
      disconnected() {
        console.log('Login disconnected');
      },
    },
  },
  methods: {
    googleLogin() {
      console.log('Google login', this.token);
    },
    doLogin() {
      this.$http.post(`${config.hostname}/api/v1/auth/sign_in`, { email: this.email, password: this.password }).then((res) => {
        this.$store.commit('user', res.data.data);
        this.$router.push('/');
      }).catch((err) => {
        console.error('err', err);
      });
    },
  },
  created() {
    const token = this.$uuid.v4();
    this.token = token;
    this.$cable.connection.connect(`wss://dev-recipes.thecovrigs.net/cable?token=${token}`);
    this.$cable.subscribe({
      channel: 'LoginChannel',
    });
  },
  beforeDestroy() {
    this.$cable.connection.disconnect();
  },
};
</script>

<style lang="scss" scoped>
div.v-card {
  max-width: 400px;
}
div.v-card__actions {
  display: flex;
  justify-content: space-between;
}
</style>
