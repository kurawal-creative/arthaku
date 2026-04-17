<script lang="ts">
  import CloudDownloadIcon from "@lucide/svelte/icons/cloud-download";
  import { Button } from "$lib/components/ui/button";

  let selectedFile = $state<File | null>(null);
  let uploadStatus = $state<"idle" | "uploading" | "success" | "error">("idle");

  function handleFileSelect(e: Event) {
    const input = e.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) return;

    const fileExtension = file.name.split(".").pop()?.toLowerCase();
    const isValidFormat = fileExtension && (fileExtension === "csv" || fileExtension === "xlsx" || fileExtension === "xls");

    if (!isValidFormat) {
      alert("Hanya file CSV atau Excel (XLSX, XLS) yang diterima");
      return;
    }

    selectedFile = file;
  }

  function handleUpload() {
    if (!selectedFile) {
      alert("Pilih file terlebih dahulu");
      return;
    }

    uploadStatus = "uploading";

    // Simulate upload - replace dengan API call nanti
    setTimeout(() => {
      uploadStatus = "success";
      selectedFile = null;

      setTimeout(() => {
        uploadStatus = "idle";
      }, 2000);
    }, 1500);
  }

  function handleReset() {
    selectedFile = null;
    uploadStatus = "idle";
    const input = document.getElementById("csvInput") as HTMLInputElement;
    if (input) input.value = "";
  }
</script>

<div class="space-y-4 rounded-2xl overflow-hidden bg-card p-4 shadow-sm">
  <div>
    <h2 class="text-base font-semibold text-foreground">Import Data</h2>
    <p class="text-sm text-muted-foreground">Upload file CSV atau Excel untuk menambahkan transaksi secara massal</p>
  </div>

  <div class="space-y-3 border-t border-border/50 pt-4">
    <div class="flex items-center gap-2 rounded-lg bg-muted/30 p-3">
      <div class="rounded-lg bg-muted/60 p-2 text-foreground">
        <CloudDownloadIcon class="h-4 w-4" />
      </div>
      <div class="flex-1">
        <p class="text-xs font-medium text-muted-foreground">Format diterima: CSV, XLSX, XLS</p>
        <p class="text-xs text-muted-foreground">
          {selectedFile ? `File terpilih: ${selectedFile.name}` : "Belum ada file yang dipilih"}
        </p>
      </div>
    </div>

    <input type="file" accept=".csv,.xlsx,.xls" class="hidden" id="csvInput" onchange={handleFileSelect} />

    <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <Button variant={selectedFile ? "destructive" : "outline"} class="rounded-xl" onclick={() => (selectedFile ? handleReset() : document.getElementById("csvInput")?.click())}>
        {selectedFile ? "Reset" : "Pilih File"}
      </Button>

      <Button disabled={!selectedFile || uploadStatus === "uploading"} class="rounded-xl" onclick={handleUpload}>
        {uploadStatus === "uploading" ? "Mengupload..." : uploadStatus === "success" ? "Berhasil!" : "Upload"}
      </Button>
    </div>
  </div>
</div>
