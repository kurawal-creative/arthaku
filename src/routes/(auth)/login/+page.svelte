<script lang="ts">
  import Button from "$lib/components/ui/button/button.svelte";
  import Input from "$lib/components/ui/input/input.svelte";
  import { signInWithGoogle } from "$lib/auth-client";
  import { signInWithEmail } from "$lib/sign-in";
  
  import googleIcons from "$lib/assets/svg/google-logo_svgstack_com_50421775096902.svg"

  let email = $state("");
  let password = $state("");
  let errorMessage = $state<string | null>(null);
  let isSubmitting = $state(false);
  let currentYear = new Date().getFullYear();

  async function handleLogin(e: SubmitEvent) {
    e.preventDefault();
    if (isSubmitting) return;

    if (!email.trim() || !password) {
      const warningMessage = "Email dan password harus diisi dulu.";
      errorMessage = warningMessage;
      return;
    }

    errorMessage = null;
    isSubmitting = true;

    const result = await signInWithEmail({
      email,
      password,
      callbackURL: "/dashboard",
    });

    if (!result.ok) {
      const error = result.error ?? "Gagal masuk. Coba lagi.";
      errorMessage = error;
      isSubmitting = false;
      return;
    }
  }
</script>

<main class="h-screen w-full bg-gray-100 p-3 md:p-4">
  <div class="flex h-full w-full gap-4 md:gap-5">
    <!-- Left -->
    <div class="flex flex-1/5 flex-col rounded-xl bg-white p-5 md:p-6">
      <!-- Header -->
      <div class="flex items-center justify-between">
        <div>logo</div>
        <p class="text-sm font-medium text-secondary-dark/90">
          Masih belum punya akun?{" "}
          <a href="/sign-up" class="cursor-pointer font-semibold text-primary transition-colors hover:text-primary-hover">
            Buat akun
          </a>
        </p>
      </div>

      <!-- Content -->
      <div class="flex flex-1 items-center justify-center">
        <div class="w-full max-w-lg">
          <div class="w-full space-y-4">
            <div class="space-y-1.5 text-start">
              <h1 class="text-3xl font-bold tracking-tight text-primary-dark md:text-4xl">Selamat datang kembali</h1>
              <p class="text-sm font-medium text-secondary-dark/90">Lanjutkan perjalanan mengatur keuanganmu dengan lebih rapi dan terkontrol.</p>
            </div>

            <form onsubmit={handleLogin}>
              <div class="space-y-4">
                <!-- Email -->
                <div class="space-y-1.5">
                  <label for="email" class="block text-sm font-medium text-secondary-dark">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    bind:value={email}
                    placeholder="Masukkan email"
                    class="rounded-xs border-primary/20 text-primary-dark placeholder:text-secondary-dark/60 focus-visible:ring-primary/40"
                    required
                  />
                </div>

                <!-- Password -->
                <div class="space-y-1.5">
                  <label for="password" class="block text-sm font-medium text-secondary-dark">
                    Password
                  </label>
                  <Input
                    id="password"
                    type="password"
                    bind:value={password}
                    placeholder="Masukkan password"
                    class="rounded-xs border-primary/20 text-primary-dark placeholder:text-secondary-dark/60 focus-visible:ring-primary/40"
                    required
                    minlength={8}
                  />
                  <div class="flex justify-end pt-1">
                    <a href="/" class="text-sm font-medium text-primary transition-colors hover:text-primary-hover">
                      Lupa password?
                    </a>
                  </div>
                </div>

                {#if errorMessage}
                  <p class="text-sm text-red-500 min-h-5">{errorMessage}</p>
                {/if}

                <Button type="submit" class="h-10 mt-4 w-full rounded-xs" disabled={isSubmitting}>
                  {isSubmitting ? "Memproses..." : "Masuk"}
                </Button>
              </div>
            </form>

            <div class="flex items-center gap-3 py-1">
              <div class="h-px flex-1 bg-primary/20"></div>
              <span class="text-sm font-medium text-secondary-dark/90">atau</span>
              <div class="h-px flex-1 bg-primary/20"></div>
            </div>

            <div class="flex">
              <Button
                type="button"
                class="w-full rounded-xs border border-primary/25 bg-white px-4 py-3 font-medium text-primary-dark transition-colors hover:border-primary/45 hover:bg-primary/5 disabled:cursor-not-allowed disabled:opacity-60"
                onclick={() => signInWithGoogle()}
              >
                <img src={googleIcons} alt="Google Logo" class="h-5 w-5" />
                Masuk dengan Google
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div class="flex w-full items-center justify-center pt-6 md:pt-8">
        <p class="text-sm text-secondary-dark">&copy; {currentYear} Arthaku, All rights reserved</p>
      </div>
    </div>

    <!-- Right -->
    <div class="hidden items-center justify-center rounded-xl bg-primary md:flex md:flex-1"></div>
  </div>
</main>