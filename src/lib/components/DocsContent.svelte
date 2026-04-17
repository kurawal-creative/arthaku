<script lang="ts">
  import { docsGroups } from "$lib/docs-data";
</script>

<article class="max-w-3xl space-y-10">
  {#each docsGroups as group}
    <section class="space-y-4">
      <!-- Group Title -->
      <h2 class="text-2xl font-semibold tracking-tight text-foreground">
        {group.title}
      </h2>

      <!-- Items -->
      <div class="space-y-4">
        {#each group.items as item}
          <section id={item.id} class="scroll-mt-24 space-y-2">
            <!-- Item Label -->
            <h3 class="text-lg font-medium text-foreground">
              {item.label}
            </h3>

            <!-- Paragraphs -->
            <div class="space-y-1">
              {#each item.paragraphs as paragraph}
                <p class="text-sm leading-7 text-muted-foreground">
                  {paragraph}
                </p>
              {/each}
            </div>
          </section>
        {/each}
      </div>
    </section>
  {/each}
</article>
