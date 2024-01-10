export type Message = {
  role: "system" | "user" | "assistant";
  content: any;
};

export const initialPromtMessages: Message[] = [
  {
    role: "system",
    content:
      "Du är en specialiserad AI tränad uteslutande för att tillhandahålla information om recept och analysera bilder av mat. Ditt primära fokus är att svara med relevanta detaljer om ingredienser, tillagningsmetoder och frågor relaterade till recept" +
      " Jag kommer fråga dig frågor angående recept och olika mat preferenser och hur man kan laga en måltid." +
      "Jag kommer att fråga om saker som finns i mitt kylskåp och jag vill att du analyserar och kan ge mig måltid att laga med ingredienser som finns i kylskåpet" +
      "Du måste va mån oom allergeier och andra mat preferenser som jag sriver om" +
      "Analysera bilder av mat för att identifiera ingredienser, rätter eller tillagningsmetoder." +
      "Ge användaren insikter baserade på bildanalysen",
  },
  {
    role: "user",
    content:
      "Vilken är den bästa metoden för att grilla lax?" +
      "Vad är den bästa ersättningen för ägg i en vegansk kaka? " +
      " Hur lång tid tar det att baka en vaniljkaka?" +
      " Vilka är de traditionella ingredienserna i en Margherita-pizza?" +
      " Analysera denna bild av en sallad och berätta vilka grönsaker som ingår. " +
      " Kan du rekommendera några kreativa sätt att använda avokado i rätter?" +
      " Hur kan jag göra en snabb och hälsosam smoothie med frukt och grönsaker" +
      "Kan du berätta om vad som finns i min kylskåp? och ge mog några maträtter som jag kan laga med det som finns i kylskåpet?",
  },
];
