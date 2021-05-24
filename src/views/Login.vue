<template>
  <v-container fill-height fluid>
    <v-row align="center" justify="center">
      <v-col>
        <v-card class="mx-auto">
          <v-card-title>
            <h1>Login - This does nothing for now...</h1>
          </v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field
                label="Username"
                prepend-icon="mdi-account-circle"
              />
              <v-text-field
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
import { pick } from 'lodash';
import config from '../config';

export default {
  name: 'Login',
  components: {},
  data() {
    return {
      showPassword: false,
    };
  },
  methods: {
    googleLogin() {
      console.log('Google login');
    },
    doLogin() {
      this.$http.post(`${config.hostname}/users/sign_in`, { email: this.email, password: this.password }).then((res) => {
        const authHeaders = pick(res.headers, ['access-token', 'client', 'expiry', 'uid', 'token-type']);
        this.$store.commit('auth', authHeaders);
        this.$store.commit('user', res.data);
        const contents = {
          tokens: authHeaders,
          user: res.data.data,
        };

        this.$cookie.set('session', JSON.stringify(contents), { expires: '14D' });
        this.$router.push('/');
      });
    },
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
