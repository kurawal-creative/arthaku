<script>
  import BotSettingsSelection from "$lib/components/dashboard/BotSettingsSelection.svelte";
  import ChatPlatformSelection from "$lib/components/dashboard/ChatPlatformSelection.svelte";
  import DataImportIntegrations from "$lib/components/dashboard/DataImportIntegrations.svelte";
  import TopbarPageHeader from "$lib/components/TopbarPageHeader.svelte";
</script>

<main class="p-4 md:p-6 space-y-6">
  <!-- Header -->
  <TopbarPageHeader title="Integrations" description="Hubungkan platform dan atur perilaku bot" />

  <!-- Chat Platforms -->
  <ChatPlatformSelection />

  <!-- Bot Settings -->
  <BotSettingsSelection />

  <!-- Data Import -->
  <DataImportIntegrations />
</main>
