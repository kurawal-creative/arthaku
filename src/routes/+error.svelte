<script>
  import errorImg from "$lib/assets/images/404.png";
</script>

<svelte:head>
  <title>Error - 404</title>
</svelte:head>

<div class="max-w-7xl flex items-center mx-auto justify-center w-full min-h-screen">
  <div class="flex flex-col gap-2 max-w-2xl mx-auto text-center">
    <enhanced:img src={errorImg} alt="Error 404" class="h-70 w-70 md:h-90 md:w-90 mx-auto mb-4" draggable="false" />
    <div class="space-y-1 max-w-md md:max-w-xl">
      <p class="text-xl md:text-2xl font-semibold text-primary-dark">Error 404: Halaman Tidak Ditemukan!</p>
      <p class="text-sm md:text-base text-secondary-dark">Kami sudah mencari ke mana pun, tapi tidak menemukan halaman yang kamu maksud.</p>
    </div>
    <a href="/" class="text-primary hover:text-primary-hover hover:underline hover:underline-offset-2 mt-2 inline-block">Kembali ke Beranda</a>
  </div>
</div>
