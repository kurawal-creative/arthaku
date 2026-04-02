<script lang="ts">
  import Button from "$lib/components/ui/button/button.svelte";
  import Input from "$lib/components/ui/input/input.svelte";

  import googleIcons from "$lib/assets/svg/google-logo_svgstack_com_50421775096902.svg"

  let email = $state("");
  let password = $state("");
  let confirmPassword = $state("");
  let errorMessage = $state<string | null>(null);
  let isSubmitting = $state(false);
  let currentYear = new Date().getFullYear();

  async function handleRegister(e: SubmitEvent) {
    e.preventDefault();
    if (isSubmitting) return;

    if (!email.trim() || !password || !confirmPassword) {
      const warningMessage = "Semua field harus diisi dulu.";
      errorMessage = warningMessage;
      return;
    }

    if (password !== confirmPassword) {
      const warningMessage = "Password dan konfirmasi password tidak cocok.";
      errorMessage = warningMessage;
      return;
    }

    if (password.length < 8) {
      const warningMessage = "Password minimal 8 karakter.";
      errorMessage = warningMessage;
      return;
    }

    errorMessage = null;
    isSubmitting = true;

    try {
      // const result = await signUpWithEmail({
      //   email,
      //   password,
      //   callbackURL: "/",
      // });

      // if (!result.ok) {
      //   const error = result.error ?? "Gagal membuat akun. Coba lagi.";
      //   errorMessage = error;
      //   isSubmitting = false;
      //   return;
      // }

      // window.location.assign("/");
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : "Gagal membuat akun. Coba lagi.";
      errorMessage = errorMsg;
      isSubmitting = false;
    }
  }
</script>

<main class="h-screen w-full bg-gray-100 p-4">
  <div class="flex h-full w-full gap-5">
    <!-- Left -->
    <div class="flex flex-1/5 flex-col justify-center rounded-xl bg-white p-6 md:p-4">
      <!-- Header -->
      <div class="flex items-center justify-between">
        <div>logo</div>
        <p class="text-sm font-medium text-secondary-dark/90">
          Sudah punya akun?{" "}
          <a href="/login" class="cursor-pointer font-semibold text-primary transition-colors hover:text-primary-hover">
            Masuk
          </a>
        </p>
      </div>

      <!-- Content -->
      <div class="flex flex-1 items-center justify-center">
        <div class="w-full max-w-lg">
          <div class="w-full space-y-5">
            <div class="space-y-1.5 text-start">
              <h1 class="text-3xl font-bold tracking-tight text-primary-dark md:text-4xl">Buat akun baru</h1>
              <p class="text-sm font-medium text-secondary-dark/90">Mulai perjalanan finansial yang lebih baik dengan Arthaku. Daftar sekarang dan kelola keuanganmu dengan mudah.</p>
            </div>

            <form onsubmit={handleRegister}>
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
                    placeholder="Buat password (minimal 8 karakter)"
                    class="rounded-xs border-primary/20 text-primary-dark placeholder:text-secondary-dark/60 focus-visible:ring-primary/40"
                    required
                    minlength={8}
                  />
                </div>

                <!-- Confirm Password -->
                <div class="space-y-1.5">
                  <label for="confirmPassword" class="block text-sm font-medium text-secondary-dark">
                    Konfirmasi Password
                  </label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    bind:value={confirmPassword}
                    placeholder="Konfirmasi password"
                    class="rounded-xs border-primary/20 text-primary-dark placeholder:text-secondary-dark/60 focus-visible:ring-primary/40"
                    required
                    minlength={8}
                  />
                </div>

                {#if errorMessage}
                  <p class="text-sm text-red-500 min-h-5">{errorMessage}</p>
                {/if}

                <Button type="submit" class="h-10 mt-12 w-full rounded-xs" disabled={isSubmitting}>
                  {isSubmitting ? "Membuat akun..." : "Buat akun"}
                </Button>
              </div>
            </form>

            <div class="flex items-center gap-3 py-1">
              <div class="h-px flex-1 bg-primary/20"></div>
              <span class="text-sm font-medium text-secondary-dark/90">atau</span>
              <div class="h-px flex-1 bg-primary/20"></div>
            </div>

            <div class="flex">
              <Button type="button" class="w-full rounded-xs border border-primary/25 bg-white px-4 py-3 font-medium text-primary-dark transition-colors hover:border-primary/45 hover:bg-primary/5 disabled:cursor-not-allowed disabled:opacity-60">
                <img src={googleIcons} alt="Google Logo" class="h-5 w-5" />
                Daftar dengan Google
              </Button>
            </div>

            <p class="text-xs text-center text-secondary-dark/70">
              Dengan mendaftar, Anda menyetujui <a href="/terms" class="text-primary hover:underline">Syarat & Ketentuan</a> dan <a href="/privacy" class="text-primary hover:underline">Kebijakan Privasi</a>
            </p>
          </div>
        </div>
      </div>

      <div class="flex w-full items-center justify-center py-4">
        <p class="text-sm text-secondary-dark">&copy; {currentYear} Arthaku, All rights reserved</p>
      </div>
    </div>

    <!-- Right -->
    <div class="hidden items-center justify-center rounded-xl bg-primary md:flex md:flex-1"></div>
  </div>
</main>