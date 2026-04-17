<script>
  import Button from "../ui/button/button.svelte";
</script>

<div class="space-y-2 rounded-2xl bg-card p-4 shadow-sm">
  <h2 class="text-base font-semibold text-foreground">
      Hapus Akun
  </h2>
  <p class="text-sm text-muted-foreground">
    Aksi ini permanen dan akan menghapus semua data akun kamu.
  </p>

  <Button variant="destructive" class="w-full rounded-xl"
    >Hapus Akun
  </Button>
</div>
