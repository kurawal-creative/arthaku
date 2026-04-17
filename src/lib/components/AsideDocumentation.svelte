<script lang="ts">
  import { onMount } from "svelte";
  import { docsGroups } from "$lib/docs-data";

  const tocGroups = docsGroups;
  const allIds = tocGroups.flatMap((group) => group.items.map((item) => item.id));

  let activeId = $state(allIds[0] ?? "");

  function handleNavClick(event: MouseEvent, id: string) {
    event.preventDefault();

    const target = document.getElementById(id);
    if (!target) return;

    activeId = id;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    history.pushState(null, "", `#${id}`);
  }

  onMount(() => {
    if (!allIds.length) return;

    const syncActiveFromHash = () => {
      const hashId = window.location.hash.replace("#", "");
      if (hashId && allIds.includes(hashId)) {
        activeId = hashId;
      }
    };

    syncActiveFromHash();

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        const firstVisibleId = visible[0]?.target.id;
        if (firstVisibleId) {
          activeId = firstVisibleId;
        }
      },
      {
        rootMargin: "-20% 0px -65% 0px",
        threshold: [0, 1],
      },
    );

    const sections = allIds.map((id) => document.getElementById(id)).filter((node): node is HTMLElement => Boolean(node));

    sections.forEach((section) => observer.observe(section));
    window.addEventListener("hashchange", syncActiveFromHash);

    return () => {
      sections.forEach((section) => observer.unobserve(section));
      observer.disconnect();
      window.removeEventListener("hashchange", syncActiveFromHash);
    };
  });
</script>

<aside class="sticky top-8 hidden h-fit w-72 shrink-0 lg:block">
  <div class="space-y-5">
    {#each tocGroups as group}
      <section class="space-y-2">
        <h2 class="text-sm font-medium leading-6 text-foreground/90">{group.title}</h2>

        <ul class="space-y-1 border-l-2 border-border/70">
          {#each group.items as item}
            <li>
              <a href={`#${item.id}`} onclick={(event) => handleNavClick(event, item.id)} class={`-ml-px block border-l-2 border-transparent py-1 pl-4 text-sm text-muted-foreground transition-colors hover:text-foreground ${activeId === item.id ? "border-primary font-medium text-primary" : ""}`}>
                {item.label}
              </a>
            </li>
          {/each}
        </ul>
      </section>
    {/each}
  </div>
</aside>
