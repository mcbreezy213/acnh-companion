export function getGiftSuggestion(personality: string) {

  const gifts: Record<string, string> = {
    Smug: "Wrapped iron wall lamp",
    Normal: "Wrapped coconut",
    Jock: "Wrapped protein shaker bottle",
    Peppy: "Wrapped fruit",
    Lazy: "Wrapped snack",
    Snooty: "Wrapped elegant clothing",
    Cranky: "Wrapped iron wall lamp",
    Sisterly: "Wrapped fruit"
  };

  return gifts[personality] || "Wrapped fruit";
}