"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import supabase from "../../utils/supabase/client";
import AuthGuard from "../components/AuthGuard";
import { getAIReply } from "../../utils/api";


async function generateBotReplies(userInput) {
  const reply = await getAIReply(userInput);
  return [reply];
}


function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

   const combinedAwakenings = [
    
    `“And the servants of the Most Merciful are those who walk upon the earth humbly.” (25:63)<br>
     “Your humility is your crown.” — Yasmin Mogahed<br>
     “Pride makes us artificial and humility makes us real.” — Thomas Merton`,

    `“Say, ‘Indeed, my prayer, my worship, my life and my death are for Allah, Lord of the worlds.’” (6:162)<br>
     “Your life is your message to the world. Make it inspiring.” — Lorrin L. Lee<br>
     “Do not act as if you were going to live ten thousand years.” — Marcus Aurelius`,

    `“But they plan, and Allah plans. And Allah is the best of planners.” (3:54)<br>
     “Sometimes when things are falling apart, they may actually be falling into place.” — Unknown<br>
     “The universe is change; life is opinion.” — Marcus Aurelius`,

    `“He gives wisdom to whom He wills, and whoever has been given wisdom has certainly been given much good.” (2:269)<br>
     “Knowledge speaks, but wisdom listens.” — Jimi Hendrix<br>
     “It is the power of the mind to be unconquerable.” — Seneca`,

    `“So take what is given freely, enjoin what is good, and turn away from the ignorant.” (7:199)<br>
     “You do not have to attend every argument you're invited to.” — Unknown<br>
     “It is the mark of an educated mind to be able to entertain a thought without accepting it.” — Aristotle`,

    `“Indeed, it is He who is the Accepting of repentance, the Merciful.” (2:54)<br>
     “Forgiveness liberates the soul. It removes fear.” — Nelson Mandela<br>
     “A wise man is one who forgets the wrongs of others.” — Seneca`,

    `“So verily, with every difficulty, there is relief.” (94:6)<br>
     “This too shall pass.” — Persian proverb<br>
     “We suffer more often in imagination than in reality.” — Seneca`,

    `“Indeed, Allah will not change the condition of a people until they change what is in themselves.” (13:11)<br>
     “Nothing changes until you do.” — Unknown<br>
     “The only thing in our power is our own thoughts.” — Epictetus`,

    `“And Allah is over all things competent.” (2:284)<br>
     “You don’t have to figure it all out. You just have to keep moving forward.” — Unknown<br>
     “If it is not right, do not do it. If it is not true, do not say it.” — Marcus Aurelius`,

    `“Indeed, those who have said, ‘Our Lord is Allah’ and then remained steadfast – the angels will descend upon them.” (41:30)<br>
     “Be so rooted in your truth that no storm can shake you.” — Unknown<br>
     “Stand firm like a rock, unmoved by the crashing waves.” — Seneca`,

    `“And whoever does righteous deeds, whether male or female, while being a believer – We will grant them a good life.” (16:97)<br>
     “Your deeds are your monuments.” — Rumi<br>
     “Don’t explain your philosophy. Embody it.” — Epictetus`,

    `“And to Allah belong the best names, so invoke Him by them.” (7:180)<br>
     “The names of God are poetry written into the universe.” — Rumi<br>
     “The soul becomes dyed with the color of its thoughts.” — Marcus Aurelius`,

    `“Indeed, the most noble of you in the sight of Allah is the most righteous of you.” (49:13)<br>
     “The way you treat people is your real wealth.” — Unknown<br>
     “True nobility is being superior to your former self.” — Ernest Hemingway`,

    `“And put your trust in Allah. And sufficient is Allah as Disposer of affairs.” (33:3)<br>
     “Let go, or be dragged.” — Zen proverb<br>
     “Don’t demand that things happen as you wish. Accept them as they happen.” — Epictetus`,

    `“Indeed, your Lord is vast in mercy.” (6:147)<br>
     “Your worst days do not define your worth.” — Unknown<br>
     “Nothing natural is evil.” — Marcus Aurelius`,

    `“And it may be that you dislike a thing which is good for you.” (2:216)<br>
     “Sometimes rejection is redirection.” — Unknown<br>
     “Whatever happens at all happens as it should.” — Marcus Aurelius`,

    `“And they ask you about the soul. Say, ‘The soul is of the affair of my Lord.’” (17:85)<br>
     “What is essential is invisible to the eye.” — Antoine de Saint-Exupéry<br>
     “The soul is dyed by the thoughts it thinks.” — Marcus Aurelius`,

    `“Indeed, the help of Allah is near.” (2:214)<br>
     “Faith is not knowing what the future holds, but knowing who holds the future.” — Unknown<br>
     “He who has a why can bear any how.” — Friedrich Nietzsche`,

    `“The Day every soul will find what it has done of good present.” (3:30)<br>
     “You write your story each day. Make it worth reading.” — Unknown<br>
     “Live as if you were living a second time, and as though you had acted wrongly the first time.” — Viktor Frankl`,

    `“And be not like those who forgot Allah, so He made them forget themselves.” (59:19)<br>
     “To find yourself, you must return to the One who created you.” — Unknown<br>
     “Know thyself.” — Socratic maxim`,

    `“Whoever does good – it is for his own soul.” (45:15)<br>
     “You rise by lifting others.” — Robert Ingersoll<br>
     “Act as if what you do makes a difference. It does.” — William James`,

    `“But Allah is your protector, and He is the best of helpers.” (3:150)<br>
     “Lean not on your own strength, but on the One who sustains the stars.” — Unknown<br>
     “The wise man looks to the purpose of all actions.” — Seneca`,

    `“Indeed, Allah does not wrong the people at all.” (10:44)<br>
     “Justice is the soul of peace.” — Unknown<br>
     “No man is free unless he is master of himself.” — Epictetus`,

    `“And He is with you wherever you are.” (57:4)<br>
     “Even in solitude, you are not alone.” — Rumi<br>
     “Withdraw into yourself. There is a deep well of strength within.” — Marcus Aurelius`,

    `“And those who strive for Us – We will surely guide them to Our ways.” (29:69)<br>
     “Courage doesn’t always roar. Sometimes it’s a whisper that says: ‘I’ll try again tomorrow.’” — Mary Anne Radmacher<br>
     “Difficulties strengthen the mind.” — Seneca`,

    `“And Allah encompasses all things in knowledge.” (65:12)<br>
     “Not knowing is part of the journey.” — Unknown<br>
     “To know that you do not know is the beginning of wisdom.” — Socrates`,

    `“And your Lord is most generous.” (96:3)<br>
     “Your story is not over yet.” — Unknown<br>
     “The things you think about determine the quality of your mind.” — Marcus Aurelius`,

    `“So whoever is given wisdom has been truly blessed.” (2:269)<br>
     “Knowledge is learning something every day. Wisdom is letting go of something every day.” — Zen proverb<br>
     “No man was ever wise by chance.” — Seneca`,

    `“And He is the best of providers.” (62:11)<br>
     “Abundance flows where belief goes.” — Unknown<br>
     “Wealth consists not in having great possessions, but in having few wants.” — Epictetus`,

    `“Indeed, it is He who enriches and suffices.” (53:48)<br>
     “You are not empty. You are filled with unseen strength.” — Unknown<br>
     “A contented mind is the greatest blessing a man can enjoy.” — Joseph Addison`,
    
    `“Your Lord has not forsaken you, nor has He detested [you].” (93:3)<br>
     “You were never too broken to bloom.” — Rupi Kaur<br>
     “No one can lose either the past or the future — only the present.” — Marcus Aurelius`,

    `“And be patient. Surely, Allah is with the patient.” (8:46)<br>
     “Silence is sometimes the strongest scream.” — Unknown<br>
     “He who laughs at himself never runs out of things to laugh at.” — Epictetus`,

    `“Indeed, Allah is ever Knowing and Wise.” (4:17)<br>
     “You don’t have to see the whole staircase, just take the first step.” — Martin Luther King Jr.<br>
     “Difficulties strengthen the mind, as labor does the body.” — Seneca`,

    `“And the Hereafter is better for you than the first [life].” (93:4)<br>
     “Ruin is the road to transformation.” — Elizabeth Gilbert<br>
     “Don’t aim to be liked. Aim to be respected.” — Marcus Aurelius`,

    `“Allah is the Light of the heavens and the earth.” (24:35)<br>
     “Even the stars need darkness to shine.” — Unknown<br>
     “Contentment is natural wealth, luxury is artificial poverty.” — Socrates`,

    `“And your Lord is Forgiving, Full of Mercy.” (18:58)<br>
     “You are allowed to be both a masterpiece and a mess.” — Unknown<br>
     “What you do not wish for yourself, do not impose on others.” — Confucius`,

    `“Indeed, the mercy of Allah is near to the doers of good.” (7:56)<br>
     “She remembered who she was, and the game changed.” — Lalah Delia<br>
     “True freedom is found in self-discipline.” — Epictetus`,

    `“Say: The truth is from your Lord.” (18:29)<br>
     “What is meant for you will reach you even if it is beneath two mountains.” — Arabic proverb<br>
     “A wise man is content with his lot, whatever it may be.” — Seneca`,

    `“We are nearer to him than [his] jugular vein.” (50:16)<br>
     “You are seen. You are known. You are not invisible.” — Unknown<br>
     “Don’t let your reflection be what the world tells you to see.” — Epictetus`,

    `“So do not weaken and do not grieve, and you will be superior.” (3:139)<br>
     “Nothing is more beautiful than the smile that has struggled through tears.” — Demi Lovato<br>
     “He who is not a good servant will not be a good master.” — Plato`,

    `“Say: My Lord, increase me in knowledge.” (20:114)<br>
     “The heart is a thousand-stringed instrument that can only be tuned with love.” — Hafiz<br>
     “Freedom is secured not by the fulfilling of men’s desires, but by the removal of desire.” — Epictetus`,

    `“So whoever does an atom’s weight of good will see it.” (99:7)<br>
     “Every small action matters. It adds up.” — Unknown<br>
     “The only wealth which you will keep forever is the wealth you have given away.” — Marcus Aurelius`,

    `“Indeed, the most honorable of you in the sight of Allah is the most righteous of you.” (49:13)<br>
     “You don’t need to be loud to be powerful.” — Unknown<br>
     “Be silent for the most part, or speak things that are not better left unsaid.” — Epictetus`,

    `“And whoever is guided is only guided for [the benefit of] himself.” (17:15)<br>
     “Don't chase people. Be yourself. Do your own thing. Work hard. The right people will come.” — Will Smith<br>
     “To find yourself, think for yourself.” — Socrates`,

    `“Then which of the favors of your Lord will you deny?” (55:13)<br>
     “Gratitude turns what we have into enough.” — Unknown<br>
     “He who is not grateful for little will not be grateful for much.” — Marcus Aurelius`,

    `“And He gives you from all you ask of Him.” (14:34)<br>
     “What you seek is seeking you.” — Rumi<br>
     “Desire is a contract you make with yourself to be unhappy.” — Naval Ravikant`,

    `“Indeed, to Allah we belong and to Him we return.” (2:156)<br>
     “The soul always knows what to do to heal itself. The challenge is to silence the mind.” — Caroline Myss<br>
     “The universe is change; life is opinion.” — Marcus Aurelius`,

    `“And Allah is Forgiving and Merciful.” (2:218)<br>
     “Your flaws are perfect for the heart that is meant to love you.” — Trent Shelton<br>
     “The nearer a man comes to a calm mind, the closer he is to strength.” — Marcus Aurelius`,

    `“Say, My Lord is near and responsive.” (11:61)<br>
     “You carry so much light inside you — don’t let it go dim.” — Unknown<br>
     “When you arise in the morning, think of what a precious privilege it is to be alive.” — Marcus Aurelius`,

    `“And your Lord is never unjust.” (18:49)<br>
     “Some people survive because they hold on. Others survive because they let go.” — Unknown<br>
     “No man is hurt but by himself.” — Diogenes`,

    `“Indeed, Allah commands justice and excellence.” (16:90)<br>
     “The smallest act of kindness is worth more than the grandest intention.” — Oscar Wilde<br>
     “He who does good is never overcome by evil.” — Seneca`,

    `“And establish prayer to remember Me.” (20:14)<br>
     “Within you is a stillness and a sanctuary to which you can retreat at any time.” — Hermann Hesse<br>
     “It is not death that a man should fear, but never beginning to live.” — Marcus Aurelius`,

    `“He gives wisdom to whom He wills.” (2:269)<br>
     “Wisdom begins in wonder.” — Socrates<br>
     “Only the educated are free.” — Epictetus`,

    `“And He is the most merciful of the merciful.” (7:151)<br>
     “Be kinder to yourself today. You are doing the best you can.” — Unknown<br>
     “The greatest wealth is to live content with little.” — Plato`,

    `“Indeed, good deeds erase bad deeds.” (11:114)<br>
     “Healing is not linear. Neither is growth.” — Unknown<br>
     “It is quality rather than quantity that matters.” — Seneca`,

    `“And We have made you peoples and tribes that you may know one another.” (49:13)<br>
     “Our differences are not intended to divide but to enrich.” — Unknown<br>
     “Man is by nature a social animal.” — Aristotle`,

    `“And Allah has full knowledge of all things.” (58:7)<br>
     “You are seen even when you feel invisible.” — Unknown<br>
     “The wise man does not expose himself needlessly to danger.” — Aristotle`,

    `“And if you are grateful, I will surely increase you [in favor].” (14:7)<br>
     “Gratitude unlocks the fullness of life.” — Melody Beattie<br>
     “He is a wise man who does not grieve for the things he has not, but rejoices for those which he has.” — Epictetus`,

    `“And Allah is with the doers of good.” (29:69)<br>
     “What you do makes a difference, and you have to decide what kind of difference you want to make.” — Jane Goodall<br>
     “The highest good is to live according to reason.” — Zeno of Citium`,

    `“And Allah is the best of providers.” (62:11)<br>
     “The universe will reward the soul that does not quit.” — Unknown<br>
     “Luck is what happens when preparation meets opportunity.” — Seneca`,
    
    `“And He found you lost and guided [you].” (93:7)<br>
     “If the path is beautiful, let us not ask where it leads.” — Anatole France<br>
     “You always own the option of having no opinion.” — Marcus Aurelius`,

    `“Whoever fears Allah – He will make for him a way out.” (65:2)<br>
     “Sometimes we must be broken so we can be rebuilt stronger.” — Unknown<br>
     “Freedom is the only worthy goal in life.” — Epictetus`,

    `“Indeed, He is ever Accepting of repentance.” (4:16)<br>
     “There is no wound too deep that light cannot enter.” — Rumi<br>
     “First say to yourself what you would be; and then do what you have to do.” — Epictetus`,

    `“And Allah is the best of planners.” (8:30)<br>
     “Stars can't shine without darkness.” — D.H. Sidebottom<br>
     “If you seek tranquility, do less.” — Marcus Aurelius`,

    `“Verily, after hardship comes ease.” (94:6)<br>
     “You do not just wake up and become the butterfly.” — Nayyirah Waheed<br>
     “We suffer more in imagination than in reality.” — Seneca`,

    `“So remember Me; I will remember you.” (2:152)<br>
     “The moon stays bright when it doesn't avoid the night.” — Rumi<br>
     “To live a good life: We have the potential for it. If we learn to be indifferent to what makes no difference.” — Marcus Aurelius`,

    `“And whoever relies upon Allah – then He is sufficient for him.” (65:3)<br>
     “You are not a drop in the ocean. You are the entire ocean in a drop.” — Rumi<br>
     “The best revenge is not to be like your enemy.” — Marcus Aurelius`,

    `“Indeed, Allah is with those who are patient.” (2:153)<br>
     “The quieter you become, the more you are able to hear.” — Rumi<br>
     “Do not explain your philosophy. Embody it.” — Epictetus`,

    `“And We have certainly created man in hardship.” (90:4)<br>
     “One day you will look back and see that all along, you were blooming.” — Morgan Harper Nichols<br>
     “No man is free who is not master of himself.” — Epictetus`,

    `“Your Lord has not forsaken you, nor has He detested [you].” (93:3)<br>
     “The wound is the place where the light enters you.” — Rumi<br>
     “He who has a why to live can bear almost any how.” — Friedrich Nietzsche`,

    `“Allah does not burden a soul beyond that it can bear.” (2:286)<br>
     “And still, after all this time, the Sun has never said to the Earth, ‘You owe me.’” — Hafiz<br>
     “Man conquers the world by conquering himself.” — Zeno of Citium`,

    `“Indeed, My mercy encompasses all things.” (7:156)<br>
     “You have been assigned this mountain to show others it can be moved.” — Unknown<br>
     “To be even-minded is the greatest virtue.” — Heraclitus`,

    `“So truly where there is hardship, there is ease.” (94:6)<br>
     “Broken crayons still color.” — Unknown<br>
     “It’s not what happens to you, but how you react to it that matters.” — Epictetus`,

    `“He knows what is within every soul.” (67:13)<br>
     “Be like a tree and let the dead leaves drop.” — Rumi<br>
     “You become what you give your attention to.” — Epictetus`,

    `“And seek help through patience and prayer.” (2:45)<br>
     “Don’t try to rush things that need time to grow.” — Unknown<br>
     “Be tolerant with others and strict with yourself.” — Marcus Aurelius`,

    `“And He gives life to the earth after its death.” (30:50)<br>
     “You were never meant to shrink. You were meant to rise.” — Nayyirah Waheed<br>
     “Waste no more time arguing what a good person should be. Be one.” — Marcus Aurelius`,

    `“Indeed, your effort is seen.” (92:4)<br>
     “It is never too late to be what you might have been.” — George Eliot<br>
     “Don’t explain your philosophy. Embody it.” — Epictetus`,

    `“And they planned, but Allah planned. And Allah is the best of planners.” (3:54)<br>
     “Your journey is not insignificant.” — Morgan Harper Nichols<br>
     “Fortune and misfortune come to test character.” — Seneca`,

    `“Allah loves those who trust in Him.” (3:159)<br>
     “Sometimes the bravest thing you can do is keep going.” — Unknown<br>
     “He who is brave is free.” — Seneca`,

    `“He is with you wherever you are.” (57:4)<br>
     “You are not alone. You never were.” — Rumi<br>
     “Look well into thyself; there is a source of strength which will always spring up if you will always look.” — Marcus Aurelius`,

    `“Indeed, your Lord is near.” (11:61)<br>
     “Even when it seems nothing is happening, you are still becoming.” — Morgan Harper Nichols<br>
     “Suffering is the fuel of strength — properly used, it builds unshakable character.” — Seneca`,

    `“Every soul will taste death.” (3:185)<br>
     “Live as if you were to die tomorrow. Learn as if you were to live forever.” — Gandhi<br>
     “Don’t fear death — fear the life not fully lived.” — Stoic proverb`,

    `“To Allah is the final return.” (35:18)<br>
     “Sometimes the strength within you is not a big fiery flame, but a tiny spark that whispers, ‘You got this.’” — Unknown<br>
     “No evil is honorable, but death is honorable; therefore, death is not evil.” — Zeno of Citium`,

    `“Say: Nothing will happen to us except what Allah has written for us.” (9:51)<br>
     “Storms make trees take deeper roots.” — Dolly Parton<br>
     “Difficulties show men what they are.” — Epictetus`,

    `“And whoever puts their trust in Allah – He will be enough for them.” (65:3)<br>
     “You’re allowed to be both a masterpiece and a work in progress.” — Sophia Bush<br>
     “We should always be asking ourselves: ‘Is this something that is, or is not, in my control?’” — Epictetus`,

    `“Indeed, We created man in hardship.” (90:4)<br>
     “Sometimes we survive by simply continuing.” — Unknown<br>
     “Wealth consists not in having great possessions, but in having few wants.” — Epictetus`,

    `“And He is the most merciful of the merciful.” (12:64)<br>
     “You are enough. You always were.” — Unknown<br>
     “The happiness of your life depends upon the quality of your thoughts.” — Marcus Aurelius`,

    `“Say, My Lord has commanded justice.” (7:29)<br>
     “And if I asked you to name all the things you love, how long would it take to name yourself?” — Unknown<br>
     “A good character, when established, becomes a habit.” — Aristotle`,

    `“So verily, with the hardship, there is relief.” (94:6)<br>
     “Be messy and complicated and afraid and show up anyway.” — Glennon Doyle<br>
     “You have power over your mind — not outside events. Realize this, and you will find strength.” — Marcus Aurelius`,

    `“And those who strive for Us – We will surely guide them to Our ways.” (29:69)<br>
     “The comeback is always stronger than the setback.” — Unknown<br>
     “Only in hardship do we discover what we are made of.” — Seneca`,

    `“He created the heavens and the earth in truth.” (6:73)<br>
     “Be patient where you sit in the dark. The dawn is coming.” — Rumi<br>
     “No great thing is created suddenly.” — Epictetus`,

    `“And know that Allah is with the righteous.” (9:36)<br>
     “A flower does not think of competing with the flower next to it. It just blooms.” — Zen proverb<br>
     “The best revenge is to be unlike him who performed the injury.” — Marcus Aurelius`,

    `“So truly where there is hardship, there is also ease.” (94:6)<br>
     “She stood in the storm, and when the wind did not blow her way, she adjusted her sails.” — Elizabeth Edwards<br>
     “The universe is change; our life is what our thoughts make it.” — Marcus Aurelius`,

    `“Whoever comes to Me walking, I will come to him running.” — Hadith Qudsi<br>
     “Your soul knows the way. Trust it.” — Unknown<br>
     “Freedom is the only worthy goal in life.” — Epictetus`,

    `“And Allah would not punish them while they seek forgiveness.” (8:33)<br>
     “Be soft. Do not let the world make you hard.” — Iain S. Thomas<br>
     “You become what you give your attention to.” — Epictetus`,

    `“Surely, My mercy encompasses all things.” (7:156)<br>
     “You are allowed to be both a masterpiece and a work in progress simultaneously.” — Sophia Bush<br>
     “It’s not what happens to you, but how you react to it that matters.” — Epictetus`,

    `“And He will provide for him from where he does not expect.” (65:3)<br>
     “Courage doesn’t always roar. Sometimes it’s the quiet voice at the end of the day saying, ‘I will try again tomorrow.’” — Mary Anne Radmacher<br>
     “If you are distressed by anything external, the pain is not due to the thing itself, but to your estimate of it.” — Marcus Aurelius`,

    `“Say, ‘Nothing will ever befall us except what Allah has destined for us.’” (9:51)<br>
     “Just because the path is difficult doesn’t mean you’re on the wrong one.” — Unknown<br>
     “The greater the difficulty, the more glory in surmounting it.” — Epicurus`,

    `“And your Lord is most forgiving, owner of mercy.” (18:58)<br>
     “Even when the sky is full of clouds, the sun still shines above.” — Unknown<br>
     “Man is not worried by real problems so much as by his imagined anxieties.” — Epictetus`,

    `“And speak to people good [words].” (2:83)<br>
     “Raise your words, not voice. It is rain that grows flowers, not thunder.” — Rumi<br>
     “To love only what happens, what was destined. No greater harmony.” — Marcus Aurelius`,
    
    `“And He knows what is in every heart.” (67:13)<br>
     “Your heart is the size of an ocean. Go find yourself in its hidden depths.” — Rumi<br>
     “No man is free who is not master of himself.” — Epictetus`,

    `“So verily, with the hardship, there is relief.” (94:5)<br>
     “You were never meant to shrink. You were meant to rise.” — Nayyirah Waheed<br>
     “The obstacle on the path becomes the path. Never forget that.” — Marcus Aurelius`,

    `“And whoever relies upon Allah – then He is sufficient for him.” (65:3)<br>
     “I will rise after every fall, like the moon after the darkest night.” — Unknown<br>
     “Don’t aspire to be the person who escapes pain. Aspire to be the one who transforms it.” — Seneca`,

    `“Indeed, my Lord is near and responsive.” (11:61)<br>
     “You are not too much. You were never too much.” — Unknown<br>
     “Freedom is the moment you stop arguing with reality.” — Marcus Aurelius`,

    `“They plan, and Allah plans. And Allah is the best of planners.” (3:54)<br>
     “What is for you will reach you even if it is beneath two mountains.” — Arabic proverb<br>
     “Accept whatever comes to you woven in the pattern of your destiny.” — Marcus Aurelius`,

    `“The believers are but brothers.” (49:10)<br>
     “You are never alone — your pain is shared by the universe.” — Nayyirah Waheed<br>
     “We are waves from the same sea, leaves from the same tree.” — Seneca`,

    `“Say: My Lord has commanded justice.” (7:29)<br>
     “Be like a river. Flow around the obstacles. Be still in the deep.” — Rumi<br>
     “A gem cannot be polished without friction, nor a person perfected without trials.” — Seneca`,

    `“Call upon Me; I will respond to you.” (40:60)<br>
     “There is no shame in being broken — only in refusing to grow again.” — Unknown<br>
     “Dwell on the beauty of life. Watch the stars, and see yourself running with them.” — Marcus Aurelius`,

    `“He gives life to the earth after its death.” (30:50)<br>
     “Every ending is just a new beginning in disguise.” — Atticus<br>
     “Fate leads the willing and drags the unwilling.” — Seneca`,

    `“And your Lord is going to give you, and you will be satisfied.” (93:5)<br>
     “Sometimes the greatest way to say ‘I can’ is to simply breathe.” — Rupi Kaur<br>
     “Man conquers the world by conquering himself.” — Zeno of Citium`,
    
    `“Indeed, with hardship comes ease.” (94:6)<br>
     “The wound is the place where the light enters you.” — Rumi<br>
     “You have power over your mind — not outside events.” — Marcus Aurelius`,

    `“Do not despair of the mercy of Allah.” (39:53)<br>
     “Try to be a rainbow in someone’s cloud.” — Maya Angelou<br>
     “He who angers you conquers you.” — Elizabeth Kenny`,

    `“Verily, with every difficulty there is relief.” (94:6)<br>
     “Even the darkest night will end and the sun will rise.” — Victor Hugo<br>
     “The soul becomes dyed with the color of its thoughts.” — Marcus Aurelius`,

    `“Whoever puts his trust in Allah, He will be enough for him.” (65:3)<br>
     “What hurts you, blesses you. Darkness is your candle.” — Rumi<br>
     “First say to yourself what you would be; and then do what you have to do.” — Epictetus`,

    `“And He found you lost and guided [you].” (93:7)<br>
     “I am not what happened to me, I am what I choose to become.” — Carl Jung<br>
     “Don’t explain your philosophy. Embody it.” — Epictetus`,

    `“Allah does not burden a soul beyond that it can bear.” (2:286)<br>
     “Your heart knows the way. Run in that direction.” — Rumi<br>
     “It is not death that a man should fear, but never beginning to live.” — Marcus Aurelius`,

    `“Surely Allah is with those who are patient.” (2:153)<br>
     “My dark days made me strong. Or maybe I was already strong, and they made me prove it.” — Emery Lord<br>
     “You have the power over your mind — not outside events. Realize this, and you will find strength.” — Marcus Aurelius`,

    `“And whoever fears Allah – He will make for him a way out.” (65:2)<br>
     “It’s your road and yours alone. Others may walk it with you, but no one can walk it for you.” — Rumi<br>
     “How long are you going to wait before you demand the best for yourself?” — Epictetus`,

    `“So remember Me; I will remember you.” (2:152)<br>
     “This moment is enough. This breath is enough. This life is enough.” — Rupi Kaur<br>
     “Very little is needed to make a happy life; it is all within yourself.” — Marcus Aurelius`,

    `“And He is with you wherever you are.” (57:4)<br>
     “Be like a tree and let the dead leaves drop.” — Rumi<br>
     “Waste no more time arguing what a good person should be. Be one.” — Marcus Aurelius`
  ];

  const emotionTriggers = {
   
   "die": [
     "If you’re thinking about dying — please wait. This isn’t the end of your story.",
     "Wanting to die often means wanting the pain to stop, not life itself.",
     "You are not alone. There are people who would be devastated to lose you.",
     "This moment is heavy, but it is not permanent. Hold on.",
     "You are loved, even if it doesn’t feel like it right now.",
     "Let this moment pass. You can get through one more breath.",
     "Your pain is real — but so is the possibility of healing.",
     "You don’t need to disappear — you need space, safety, and care.",
     "Even if you can’t see your worth, I promise it’s still there.",
     "Please reach out. You matter more than you know."
   ],

   "isolated": [
     "Feeling isolated doesn’t mean you’re unworthy — just unseen.",
     "You may feel alone, but others feel this way too.",
     "Isolation is a circumstance, not your identity.",
     "You’re still lovable — even in solitude.",
     "Being physically alone doesn’t mean you are forgotten.",
     "There are people out there who would understand — don’t give up.",
     "You’re allowed to crave connection. That’s not weakness.",
     "You’re not a burden — you’re a human needing support.",
     "Even in isolation, your presence matters.",
     "You belong — even when you feel distant."
   ],
   "socially anxious": [
     "You’re not awkward — you’re sensitive, and that’s okay.",
     "Social anxiety doesn’t mean you’re broken — it means you care.",
     "Your nervousness in social situations is valid and human.",
     "You don’t need to be perfect to be accepted.",
     "You are allowed to be quiet and still be valued.",
     "You are not being judged as harshly as your anxiety tells you.",
     "One moment of bravery at a time is enough.",
     "You don’t have to force confidence — it grows slowly.",
     "You can be anxious and still make meaningful connections.",
     "There’s space for you — even if it feels scary."
   ],
   "social fatigue": [
     "It’s okay to feel drained after being around others.",
     "Social fatigue is real — not selfishness.",
     "Needing space doesn’t make you rude — it makes you honest.",
     "You’re allowed to cancel plans for your mental health.",
     "Being tired of people doesn’t mean you don’t care.",
     "You’re recharging — not retreating forever.",
     "You don’t have to explain your need for quiet.",
     "Your energy is precious — protect it with care.",
     "You can love people and still need breaks from them.",
     "Rest is your right, especially after social exhaustion."
   ],
   "cancelled": [
     "Being cancelled hurts — but it doesn’t define your whole story.",
     "One moment doesn’t erase your humanity.",
     "You’re more than the worst thing people say about you.",
     "You deserve a chance to grow, not just be shamed.",
     "Your mistakes don’t make you unlovable.",
     "You are allowed to reflect and change — that’s strength.",
     "You are not your reputation — you are your effort to rise.",
     "Even in public pain, you are worthy of compassion.",
     "Don’t let fear silence your truth or your healing.",
     "You can learn, grow, and return with integrity."
   ],
   "rejected": [
     "Rejection is painful — but it’s not a measure of your worth.",
     "Not being chosen doesn’t mean you’re not enough.",
     "You can be rejected and still be amazing.",
     "You’re not for everyone — and that’s okay.",
     "Rejection redirects you to better paths.",
     "You’re worthy of love, even when others say no.",
     "You don’t need their approval to be valid.",
     "Your value is not up for debate — it’s inherent.",
     "Rejection is not your identity — it’s an event.",
     "This ‘no’ can still lead to your next ‘yes.’"
   ],
   "nobody listens to me": [
     "You deserve to be heard — your voice matters.",
     "Not being listened to doesn’t mean you’re invisible.",
     "You are not too much — they just weren’t ready to understand.",
     "You have a right to express yourself.",
     "You don’t have to scream to matter.",
     "You are not alone — someone out there wants to hear your truth.",
     "You are not unheard — you’re just waiting for the right audience.",
     "Even when they don’t listen, your words are still valid.",
     "Keep speaking. Your voice will find its place.",
     "You matter — whether they’re listening or not."
   ],

   "who am i": [
     "You don’t need all the answers right now — just honesty.",
     "Not knowing who you are is a step toward discovering yourself.",
     "Your identity isn’t lost — it’s unfolding.",
     "Questioning is part of growth, not a sign of failure.",
     "You’re allowed to evolve and outgrow old versions of yourself.",
     "The search for self is not a crisis — it’s a calling.",
     "You are not broken — you’re becoming more real.",
     "Even without clarity, your presence still matters.",
     "Let yourself explore. You’re more than one label.",
     "You are not behind — you are on your own timeline."
   ],
   "what's the meaning": [
     "It’s okay to not know the meaning — and still keep going.",
     "The search for meaning is what gives life depth.",
     "You don’t need a big answer right now — just a small purpose today.",
     "Meaning often comes after struggle — not before it.",
     "You are not lost — you’re asking honest questions.",
     "You’re allowed to wonder why — and still choose to exist.",
     "Even if the world feels hollow, you can still create meaning.",
     "This question doesn’t mean you’re broken — it means you’re alive.",
     "Let meaning be something you shape, not something you chase.",
     "You are meaningful, even when life feels meaningless."
   ],
   "lost my purpose": [
     "Losing your purpose doesn’t mean you’ve lost yourself.",
     "Purpose isn’t gone — it’s just changing.",
     "It’s okay to feel directionless during transformation.",
     "You don’t need to have it all figured out to still matter.",
     "Sometimes losing your purpose is how you find your truth.",
     "This emptiness is temporary — purpose will return.",
     "Even without direction, your presence still has value.",
     "You are in a season of rest and redefinition.",
     "It’s okay to let go of old callings — new ones are forming.",
     "You are not useless — you are evolving."
   ],
   "existential dread": [
     "It’s normal to feel heavy when you think deeply.",
     "Existential dread is a sign of your awareness — not your defeat.",
     "You’re not broken for asking big questions.",
     "Let the unknown be a space of wonder, not fear.",
     "The fact that you question meaning is a strength.",
     "It’s okay to rest even when nothing feels certain.",
     "You are part of something bigger, even when it feels abstract.",
     "Your existence matters, even if you can’t explain why yet.",
     "The weight of being human is real — and you’re not alone.",
     "Dread is not the end — it’s a doorway to depth."
   ],
   "void": [
     "The void isn’t your enemy — it’s a signal you need something more.",
     "You’re not empty — you’re longing for meaning.",
     "This hollow feeling will not last forever.",
     "You are not nothing — you are a soul waiting to feel again.",
     "Even in the void, you are still here — and that counts.",
     "Let the void be a pause, not a verdict.",
     "You don’t have to fill the emptiness all at once.",
     "You are allowed to exist even when life feels flat.",
     "The void is a sign you’re ready to grow.",
     "Hold on — meaning finds those who stay."
   ],
   "nothing feels real": [
     "It’s okay to feel disconnected — it doesn’t mean you’re broken.",
     "Your mind is overwhelmed, not malfunctioning.",
     "This disconnection is a sign of stress, not failure.",
     "Reality will feel solid again. Give it time.",
     "You are still real, even if the world feels blurry.",
     "Let yourself ground in small sensations — they bring you back.",
     "You’re not alone in this surreal experience.",
     "What you feel is common during deep stress or trauma.",
     "You haven’t lost touch — you’re protecting yourself.",
     "Let the fog pass. Your clarity will return."
   ],
   "life feels fake": [
     "Feeling like life is fake means your nervous system is overloaded — not that you're broken.",
     "It’s okay to question what’s real — many do in high stress.",
     "Even in surreal moments, your breath is real. Start there.",
     "You’re not going crazy — you’re reacting to too much.",
     "The world may feel strange, but your experience is valid.",
     "You are not lost — you’re just searching for footing.",
     "Disconnection is temporary — presence returns with time.",
     "You are still grounded — even when your mind says otherwise.",
     "What feels fake now won’t feel that way forever.",
     "You are real — and your feelings are too."
   ],

   "attachment issues": [
     "Struggling with attachment doesn’t make you broken — it makes you human.",
     "You’re allowed to want closeness and still fear it.",
     "Healing attachment wounds takes time, not perfection.",
     "Your early experiences shaped you — but they don’t have to define you.",
     "You deserve safe, secure love — even if you’ve never had it.",
     "You are not too much for the right kind of connection.",
     "It’s okay to feel anxious or avoidant — awareness is the first step.",
     "You can learn new patterns of trust and love.",
     "Love doesn’t require losing yourself.",
     "You are lovable — even when connection feels complicated."
   ],
   "rejection sensitivity": [
     "Feeling pain from rejection doesn’t make you weak — it makes you real.",
     "You’re not too sensitive — you’re deeply aware.",
     "Your worth isn’t decided by someone else’s opinion.",
     "You can be rejected and still be valuable.",
     "Sensitivity is not a flaw — it’s a superpower with tenderness.",
     "Their ‘no’ doesn’t mean you’re not enough.",
     "You can learn to self-validate when others don’t.",
     "You are allowed to feel hurt and still stand tall.",
     "Rejection isn’t proof of failure — it’s part of being brave.",
     "You’re not broken — you’re beautifully responsive to the world."
   ],
   "trust issues": [
     "You have trust issues because you’ve been hurt — that makes sense.",
     "It’s okay to move slowly in trust — you’re protecting your heart.",
     "Not everyone is out to hurt you — some people stay.",
     "You’re not cold — you’re cautious, and that’s okay.",
     "Your boundaries are valid while you heal.",
     "Trust isn’t built instantly — it’s built with time and care.",
     "It’s okay to need reassurance. That doesn’t make you needy.",
     "You’re not damaged — you’re recovering from betrayal.",
     "Trust can grow again — one safe person at a time.",
     "You are allowed to heal at your own pace."
   ],
   "people don’t get me": [
     "You don’t have to be understood by everyone to be valid.",
     "You’re not too complex — some people just don’t listen deeply.",
     "Being misunderstood is painful, but it doesn’t mean you're wrong.",
     "You deserve connection that doesn’t require explanation.",
     "Not everyone will get you — but the right ones will.",
     "You are not invisible — you’re simply rare.",
     "The right people won’t need you to shrink or translate yourself.",
     "Your depth is a strength — not a defect.",
     "You are not alone in feeling alone.",
     "You still belong — even when you feel out of place."
   ],
   "judgment": [
     "Fear of judgment comes from old wounds — not current truths.",
     "You don’t have to be perfect to be accepted.",
     "The people who matter won’t need you to filter yourself.",
     "You’re not too weird — you’re authentic, and that’s brave.",
     "Judgment hurts — but it doesn’t get to decide your worth.",
     "You’re allowed to take up space as you are.",
     "You’re not performing — you’re learning to show up.",
     "Other people’s opinions aren’t your responsibility.",
     "You are already enough, even under scrutiny.",
     "Courage is showing up real — even when afraid."
   ],

   "overstimulate": [
     "It’s okay to step away — your senses are overloaded, not broken.",
     "You’re not weak for needing quiet and calm.",
     "The world can be too much — you’re allowed to pause.",
     "Overstimulation is real. It’s not in your head — it’s in your system.",
     "You are not overreacting — you are reacting to too much at once.",
     "Silence and stillness are valid needs.",
     "You’re allowed to protect your peace without guilt.",
     "Your comfort is more important than anyone’s expectations.",
     "Take your time — the world can wait for you to feel safe again.",
     "This overwhelm will pass. Retreat is part of your resilience."
   ],
   "shutdown": [
     "Shutting down is your body’s way of protecting you — not failing you.",
     "When you go numb, it’s because you’ve felt too much.",
     "You’re not broken — you’re frozen because of overload.",
     "Give yourself permission to do nothing right now.",
     "Your healing begins when you stop forcing and start honoring.",
     "Even in shutdown, you are still worthy of care.",
     "It’s okay to pause. You’re not lazy — you’re overwhelmed.",
     "You’re allowed to reset before you re-engage.",
     "This shutdown isn’t the end — it’s a message to slow down.",
     "Your energy will return when safety and rest come first."
   ],
   "meltdown": [
     "Meltdowns are not tantrums — they’re overloaded systems crying out.",
     "You are not dramatic — you are overrun and overstimulated.",
     "It’s okay to break down when you’ve carried too much.",
     "Let the meltdown happen — release is not weakness.",
     "You are not too much. The world has just been too loud.",
     "You deserve recovery time after a meltdown — not shame.",
     "Breathe. You’ll find balance again after the storm.",
     "What you’re experiencing is valid and real.",
     "There’s no need to explain your overwhelm. Just soothe it.",
     "Even in your most intense moments, you are worthy of love."
   ],
   "decision fatigue": [
     "You’re not indecisive — you’re just overwhelmed.",
     "When every choice feels exhausting, rest is the right answer.",
     "It’s okay to delay decisions until your mind is clear.",
     "Too many choices is a kind of stress. Be kind to your brain.",
     "You don’t have to get it perfect — just choose what’s kindest.",
     "Start small. You don’t need to solve everything today.",
     "Let simplicity be your compass right now.",
     "Your capacity isn’t gone — it’s resting.",
     "You’re not failing — your brain is just asking for mercy.",
     "Even not deciding is a decision — and that’s okay for now."
   ],
   "alert fatigue": [
     "You’ve been hyper-aware for too long — it’s okay to rest.",
     "Your nervous system isn’t broken — it’s tired.",
     "You don’t have to be on guard all the time.",
     "Constant alerts lead to exhaustion, not safety.",
     "You deserve peace without always being ready for battle.",
     "Let your shoulders drop — you’re allowed to exhale.",
     "You’re not paranoid — you’ve just been overwhelmed by vigilance.",
     "Safety isn’t just external — it’s also how gently you treat yourself.",
     "Step back. Disconnect. Return to calm.",
     "Even warriors lay down their armor. You can too."
   ],
   "can't cope": [
     "Saying you can’t cope is not weakness — it’s honesty.",
     "You’ve reached your edge — now let support find you.",
     "You don’t have to carry everything alone.",
     "There is no shame in not being okay.",
     "Even strong people have moments where coping slips away.",
     "You’re overwhelmed — not broken.",
     "One step, one breath — that’s enough right now.",
     "You’ve done your best. Now let rest do the rest.",
     "Not coping doesn’t mean you’re failing. It means you need care.",
     "You are still worthy — even at your lowest."
   ],

   "self-doubt": [
     "Self-doubt doesn’t mean you’re failing — it means you care.",
     "Even confident people question themselves — you’re not alone.",
     "You’ve already overcome things your doubt said you couldn’t.",
     "The voice of doubt is loud — but it’s not the only voice in you.",
     "Courage is moving forward even when doubt whispers.",
     "Your potential isn’t erased by temporary uncertainty.",
     "Doubt is part of the path to confidence.",
     "You don’t need to have it all figured out to be worthy.",
     "You’re allowed to feel unsure and still keep going.",
     "You are more capable than your doubt gives you credit for."
   ],
   "imposter syndrome": [
     "Feeling like a fraud doesn’t mean you are one.",
     "You earned your place — even if your brain says otherwise.",
     "Imposter syndrome is a liar that shows up when you care deeply.",
     "You’re allowed to grow and still belong here.",
     "Nobody feels confident 100% of the time.",
     "Your achievements are not accidents.",
     "Doubt is normal in high-growth moments — it means you’re expanding.",
     "You are not fooling anyone — you’re impressing more than you know.",
     "Real imposters don’t reflect this hard. You’re the real deal.",
     "You are not here by mistake. You’re here because you matter."
   ],
   "people pleaser": [
     "Wanting to make others happy doesn’t mean you have to abandon yourself.",
     "You deserve boundaries — not just kindness to others.",
     "Saying no doesn’t make you a bad person.",
     "You’re allowed to disappoint others to stay true to yourself.",
     "Being a people pleaser is a coping skill — not your identity.",
     "You matter just as much as anyone you’re trying to please.",
     "You don’t need to earn love — you already deserve it.",
     "Let go of trying to be everything for everyone.",
     "You are not responsible for everyone’s emotions.",
     "Your worth is not based on how useful you are to others."
   ],
   "people pleasing": [
     "You don’t have to shrink to keep others comfortable.",
     "It’s okay to choose yourself without guilt.",
     "You were taught to please — now you can learn to protect yourself.",
     "You’re not selfish for saying what you need.",
     "Authenticity is better than approval.",
     "You don’t need everyone to like you — you need to like yourself.",
     "People pleasing often hides fear — you’re allowed to be brave now.",
     "You’re not responsible for preventing discomfort in others.",
     "It’s safe to speak your truth — even if it shakes.",
     "You can be kind and still have limits."
   ],
   "low self-esteem": [
     "Your worth isn’t up for debate — it’s a fact.",
     "Low self-esteem doesn’t mean you are low value.",
     "You’ve internalized criticism — but you can unlearn it.",
     "You are not broken — you’re just hurting.",
     "You deserve to be spoken to with love — even by yourself.",
     "You’ve survived so much — give yourself credit for that.",
     "You’re worthy of love, even when you don’t feel it.",
     "You don’t need to become better to be enough — you already are.",
     "Confidence grows from compassion, not perfection.",
     "You are not less — you are learning to see your light."
   ],
   "self-harm": [
     "Hurting yourself is not the answer — healing is.",
     "You are in pain — and you deserve support, not scars.",
     "There are safer ways to cope. Please reach out.",
     "You are not weak for struggling — you are human.",
     "You deserve to be treated gently — especially by yourself.",
     "Your pain is valid, but it doesn’t need to leave a mark.",
     "Every time you resist self-harm, you reclaim your power.",
     "You are not alone in this fight — and you don’t have to fight alone.",
     "You matter too much to keep hurting yourself.",
     "Healing is possible — even if it feels far away right now."
   ],
   "body image": [
     "Your body doesn’t have to change to be worthy of love.",
     "Beauty is not a size — it’s a presence, and you have it.",
     "You are more than your appearance.",
     "The mirror shows a reflection — not your value.",
     "You don’t need to be perfect to be powerful.",
     "Your body is not the problem — unrealistic standards are.",
     "You deserve respect in the body you’re in right now.",
     "The way you speak to yourself matters — make it kinder.",
     "You are allowed to exist without shrinking.",
     "You are not flawed — you are beautifully human."
   ],
   "body dysmorphia": [
     "What you see isn’t always what’s true.",
     "Body dysmorphia distorts perception — not reality.",
     "You are not your reflection — you are your soul.",
     "You deserve peace with your body, not war.",
     "You’re not vain — you’re struggling. And that deserves care.",
     "Even when you don’t like what you see, you still deserve kindness.",
     "You are more than any perceived flaw.",
     "You don’t need to fix your body — you need to heal your view.",
     "Others see the beauty you’re too hard on to notice.",
     "You are worthy of love at every stage of healing."
   ],
   "eating disorder": [
     "Food is not the enemy — shame is.",
     "You deserve nourishment, not punishment.",
     "An eating disorder is not vanity — it’s pain expressed through control.",
     "You are not alone — many walk this path and find healing.",
     "Your body is worthy of love, not restriction.",
     "You don’t need to earn rest, food, or care.",
     "Healing your relationship with food is an act of rebellion against shame.",
     "You are not bad for struggling — you’re brave for facing it.",
     "Recovery is hard, but your life is worth the fight.",
     "You are more than your eating disorder — you are whole, even now."
   ],
   
   "dysregulated": [
     "You’re not broken — you’re overwhelmed, and that’s human.",
     "Being emotionally dysregulated is your body’s signal, not a failure.",
     "Your reactions are shaped by survival, not weakness.",
     "It’s okay to lose balance — healing is how you find it again.",
     "Regulation starts with awareness, and you're already there.",
     "This storm inside you won’t last forever.",
     "Your nervous system is doing its best — now give it space to reset.",
     "Being out of control doesn’t mean you’ve lost yourself.",
     "You can return to calm — one breath, one moment at a time.",
     "You deserve peace, not punishment, for how you respond."
   ],
   "executive dysfunction": [
     "Struggling to start doesn’t mean you’re lazy — it means your brain is tired.",
     "Your value isn’t measured by productivity.",
     "Executive dysfunction is real — and you’re not alone in it.",
     "It’s okay to need external help or structure to function.",
     "You’re not broken — your brain just works differently.",
     "Small steps still count, even when they feel impossible.",
     "You’re allowed to rest without guilt.",
     "Not getting things done doesn’t make you worthless.",
     "You are trying — and that matters more than the outcome.",
     "Compassion helps you move — shame keeps you stuck. Choose compassion."
   ],
   "autism": [
     "You are not broken — you experience the world uniquely.",
     "Autism is not a flaw. It’s a form of brilliance.",
     "You deserve support that honors your needs, not forces you to mask.",
     "You don’t have to change who you are to be accepted.",
     "There is beauty in how you perceive, sense, and think.",
     "Your comfort matters, even if others don’t understand it.",
     "It’s okay to need quiet, space, or time — your needs are valid.",
     "Autistic burnout is real — and so is your right to recover.",
     "You’re not too much. The world just moves too fast sometimes.",
     "You belong — exactly as you are."
   ],
   "autistic burnout": [
     "Burnout doesn’t mean you failed — it means you’ve masked too long.",
     "Your exhaustion is valid. You deserve to rest.",
     "This isn't you being weak — it's your body begging for care.",
     "You’re allowed to withdraw without guilt.",
     "You don’t owe constant performance. You owe yourself protection.",
     "Unmasking is not selfish — it’s survival.",
     "Your sensitivity is not the problem — the world’s insensitivity is.",
     "Recovery from autistic burnout starts with permission to slow down.",
     "You are not alone — many walk this hidden struggle with you.",
     "You don’t have to push through. You can choose to pause."
   ],
   "neurodivergent": [
     "Being neurodivergent is not a defect — it’s a different kind of intelligence.",
     "You don’t have to conform to be worthy.",
     "You are not alone in feeling misunderstood.",
     "You deserve accommodations, not judgment.",
     "Your brain is valid — even if society doesn’t get it yet.",
     "You think differently — and that’s powerful.",
     "You’re not lazy. You’re navigating a world not made for your mind.",
     "Celebrate your strengths — even if they look different from others'.",
     "You are part of a beautiful, diverse spectrum of minds.",
     "Neurodivergence is not something to fix — it’s something to support."
   ],
   "sensory overload": [
     "Your senses are not too much — the world is just too loud right now.",
     "You’re allowed to step away and find calm.",
     "Overstimulation is real — and it’s okay to protect your peace.",
     "You’re not dramatic — you’re overwhelmed, and that’s human.",
     "Your nervous system needs gentleness, not judgment.",
     "Noise, light, touch — it adds up. Breathe and retreat if needed.",
     "There is no shame in wearing headphones, sunglasses, or saying no.",
     "Your body is reacting to too much — listen and soothe it.",
     "It’s okay to make your comfort a priority.",
     "You deserve environments that honor your sensory needs."
   ],
   "intrusive thoughts": [
     "Intrusive thoughts are not your truth — they are noise, not identity.",
     "Everyone has weird or scary thoughts — you are not alone.",
     "You are not your thoughts — you are your awareness.",
     "The more you fear the thought, the more it sticks. Let it pass.",
     "A thought is not an action. You are in control.",
     "You don’t have to argue with every thought — you can let it float by.",
     "Having a bad thought doesn’t make you a bad person.",
     "Healing means accepting the presence of thoughts without fear.",
     "You are not dangerous — you are overwhelmed.",
     "Let go of guilt. You’re doing the best you can with a busy mind."
   ],
   "ocd": [
     "Intrusive thoughts are not truths. They’re symptoms — not sins.",
     "You are not your compulsions. You are the one trying to cope.",
     "OCD is not about being neat — it’s about trying to find certainty in chaos.",
     "You are not dangerous. You are dealing with a powerful brain loop.",
     "You deserve compassion, not fear.",
     "OCD lies — it says you're not safe unless you obey. But you're learning to resist.",
     "Healing begins with accepting discomfort, not erasing it.",
     "You are more than the cycle you feel trapped in.",
     "There is nothing wrong with you — your brain just got stuck in protect mode.",
     "Recovery is real. Peace is possible."
   ],

   "adhd": [
     "Your brain works differently — and that difference holds creativity, not failure.",
     "You’re not lazy — you’re navigating a world not built for your wiring.",
     "Forgetfulness is not a flaw. It’s a signal to slow down and create systems that work for you.",
     "Your attention isn’t broken — it’s just selective and powerful when focused.",
     "ADHD doesn’t make you less — it makes you unique.",
     "You deserve understanding, not judgment.",
     "You’ve adapted your whole life. That’s resilience.",
     "Executive function is hard — and you’re doing your best.",
     "Your energy is a force. Let it be channeled, not shamed.",
     "You are not a problem to solve. You’re a person to support."
   ],

   "bpd": [
     "Your emotions are intense because your heart feels deeply. That’s not a flaw.",
     "BPD isn’t who you are — it’s something you live with, and you are not alone.",
     "You deserve love, even on your hardest days.",
     "Having BPD doesn’t make you too much — it makes you beautifully complex.",
     "You are not your outbursts. You are your effort to heal.",
     "Abandonment fears don’t make you unworthy — they make you human.",
     "You feel intensely — and that’s a gift once it's understood.",
     "Healing with BPD is possible. You are proof by trying.",
     "You don’t have to fix yourself to be worthy of love.",
     "Your story is still unfolding. And you are growing with it."
   ],

   "ptsd": [
     "Your past may echo, but it doesn’t define your future.",
     "PTSD is not weakness — it’s survival in a world that was once unsafe.",
     "You’re not broken — your brain adapted to pain. And now you’re healing.",
     "Triggers are not signs of failure — they’re invitations to go gently.",
     "You’re allowed to feel safe now. One moment at a time.",
     "Recovery isn’t linear — but every step counts.",
     "You’re not crazy — you were hurt. Now, you’re becoming whole.",
     "There’s nothing wrong with you for being affected deeply.",
     "You’re stronger than the memories. You’re still here.",
     "You deserve peace, even if your past was chaos."
   ],
   
   "overthink": [
     "Overthinking means you care deeply — but you don’t have to carry every thought to the end.",
     "Your mind is trying to protect you, not punish you. You can thank it and still let the thought go.",
     "You don’t have to solve everything right now. One step is enough.",
     "Not every thought deserves your energy. Some just need to pass.",
     "Overthinking is exhausting — give yourself permission to pause.",
     "The answers don’t always come from thinking more. Sometimes they come from feeling and resting.",
     "You are not your spiraling thoughts — you are the one observing them.",
     "Peace begins when you stop fighting every uncertainty.",
     "It’s okay to not have it all figured out. You’re still growing.",
     "You are doing your best — and that is more than enough."
   ],

   "trapped": [
     "Feeling trapped doesn’t mean there’s no way out — it just means the way forward is harder to see     right now.",
     "You are not as stuck as your mind tells you. There are paths — even if you can’t see them yet.",
     "Breathe. Even small steps count as movement. You are not frozen.",
     "This moment may feel like a cage, but it’s not your forever.",
     "You might feel surrounded by walls, but you still have power over what’s within.",
     "Being trapped is a feeling — not your fate.",
     "The weight you’re carrying doesn’t define your worth.",
     "Just because you can’t move right now doesn’t mean you never will.",
     "You are allowed to feel stuck. You are also allowed to hope.",
     "Hold on. This tight space you’re in can still open into something new."
   ],

   "hate myself": [
     "You don’t deserve your own hatred — you deserve healing.",
     "That voice telling you you’re not enough is lying.",
     "You’ve been too harsh on yourself. Try speaking to yourself like someone you love.",
     "Self-hate is a wound, not a truth.",
     "You are worthy of kindness — even your own.",
     "Pain taught you to turn inward. Now it’s time to turn gently toward yourself.",
     "You’ve survived everything that tried to break you — don’t become another enemy to yourself.",
     "Hating yourself won’t heal you. But compassion will.",
     "You are not the things you tell yourself when you’re hurting.",
     "Your soul deserves your forgiveness and your care."
   ],

   "not enough": [
     "You are not ‘not enough.’ You are more than enough — even when you can’t see it.",
     "Enough is not a standard you earn — it’s something you already are.",
     "The fact that you’re trying already makes you extraordinary.",
     "You don’t have to prove your worth. You are already worthy.",
     "You are not lacking — you’re just exhausted from trying so hard to be what you already are.",
     "You don’t need to be more. You need to see yourself more clearly.",
     "You are doing better than you think — and you are enough.",
     "Stop measuring yourself with someone else’s ruler.",
     "Enough is not about perfection — it’s about presence. And you're here.",
     "You don’t need fixing. You need reminding: you are enough."
   ],

   "stupid": [
     "Feeling stupid doesn’t make you stupid — it makes you human.",
     "You are learning, not failing.",
     "Making mistakes is proof you are growing.",
     "You are allowed to not know everything.",
     "Being confused doesn't mean you're incapable — it means you’re learning.",
     "Everyone has moments of doubt — they don’t define your intelligence.",
     "You are smarter than your inner critic allows you to believe.",
     "Judging yourself doesn’t help you grow — kindness does.",
     "You’ve already made it further than you think — that’s not stupid, that’s strong.",
     "You’re worthy of love and respect — no IQ test needed."
   ],

   "failure": [
     "Failure is not the opposite of success — it’s part of it.",
     "You are not a failure. You’re a human doing hard things.",
     "You failed at something — not at being someone.",
     "What didn’t work out was redirection, not rejection.",
     "You’re learning what doesn’t work so you can discover what does.",
     "Failures don’t define you. How you rise after them does.",
     "You are not less because something didn’t go right.",
     "You’ve overcome more than this before — and you will again.",
     "This isn’t the end. It’s a messy beginning.",
     "You’re not a failure. You’re a fighter in process."
   ],

   "broken": [
     "Broken doesn’t mean beyond repair — it means healing is beginning.",
     "You’re not broken. You’re becoming real.",
     "Cracks let the light in. Let your light through.",
     "You’ve survived shattering and still found a way to stand — that’s not broken, that’s brave.",
     "Even broken wings remember how to fly.",
     "There is strength in your softness. There is healing in your hurt.",
     "You’re still whole — even with the pieces out of place.",
     "You’re not defective — you’re deeply human.",
     "The broken parts of you are still worthy of love.",
     "You’re not your damage. You’re your decision to keep going."
   ],

   "identity": [
     "You are not lost — you are unfolding.",
     "Your identity is not a problem to solve. It’s a journey to honor.",
     "You don’t have to fit into anyone else’s definition to be real.",
     "It’s okay to question who you are — it means you’re growing.",
     "You are allowed to outgrow versions of yourself that no longer feel true.",
     "Your worth is not tied to your clarity about your identity.",
     "Even in the unknown, you are still whole.",
     "You’re not failing because you’re still figuring it out — you’re being human.",
     "You are not broken for questioning. You are brave for exploring.",
     "There is nothing wrong with you. Your identity is worthy — exactly as it is."
   ],

   "confused": [
     "It’s okay to feel confused — your clarity is not gone, it’s just on pause.",
     "Confusion is where all great understanding begins.",
     "You're not failing — you're just exploring unfamiliar territory.",
     "Feeling lost doesn't mean you're broken. It means you're evolving.",
     "Your path may feel unclear, but you are still moving forward.",
     "Confusion can be a sign that you’re breaking through old beliefs.",
     "The fog will lift. Give yourself permission to not know yet.",
     "Confusion is growth in disguise. Trust your process.",
     "You’re not alone in the uncertainty. It’s a very human place to be.",
     "Even in confusion, your inner compass still exists."
   ],

   "disoriented": [
     "Disorientation is a normal part of transition — you're not doing it wrong.",
     "When the world feels tilted, find one small thing to anchor you.",
     "You don’t need the full map — just the courage for one next step.",
     "Being disoriented doesn’t mean you’re lost forever.",
     "Pause. Breathe. Return to now — that’s where your power is.",
     "You may feel off course, but you’re still in motion.",
     "It’s okay to not feel okay right now.",
     "You’re not broken — you’re adjusting.",
     "This moment won’t last forever. Stay grounded in what you can control.",
     "Let the chaos settle. Clarity will come."
   ],

   "can't focus": [
     "Your inability to focus is not laziness — it’s your mind asking for grace.",
     "Some days, survival is your only task — and that’s enough.",
     "Rest your attention. You’re doing more than you think.",
     "Focus returns when you stop forcing it.",
     "Try one thing at a time. It’s okay to go slow.",
     "You are allowed to reset. You are allowed to breathe.",
     "Not focusing is not failure. It’s a call to pause.",
     "You are still worthy, even when your mind is scattered.",
     "Your capacity is limited because you’ve been carrying so much.",
     "Gentle focus begins with self-kindness."
   ],

   "mind racing": [
     "A racing mind is a mind that’s overwhelmed, not broken.",
     "Pause. Let one thought land at a time.",
     "You don’t need to fix every thought — just witness it.",
     "Try grounding yourself in one physical sense — feel your body return to now.",
     "Even if your thoughts are fast, your breath can be slow.",
     "This storm of thoughts will pass. It always does.",
     "You are not your anxiety. You are the sky — the thoughts are just clouds.",
     "Your mind is trying to protect you. Remind it that you are safe.",
     "It's okay to not have clarity right now.",
     "Peace comes not from silencing thoughts, but from no longer fearing them."
   ],

   "brain fog": [
     "Brain fog is your body whispering for rest.",
     "You’re not broken — you’re overwhelmed. That’s human.",
     "You don’t have to push through — you can ease through.",
     "The fog will lift. Give it time.",
     "Mental clarity returns when safety and care return.",
     "One thought at a time. That’s enough.",
     "You’re allowed to take it slow today.",
     "Even foggy minds can choose gentle actions.",
     "You’re not alone in this mental haze.",
     "Kindness to yourself is the way out of fog."
   ],

"kill": [
  "If you're thinking about killing yourself — please pause. This is not the end of your story.",
  "What you’re feeling right now is unbearably heavy, but it won’t always be this way.",
  "You don’t need to die — you need support, love, and space to heal.",
  "Suicidal thoughts are real, but they are also treatable. You are not alone in this.",
  "Please don’t act on this feeling. Talk to someone — even if it’s hard.",
  "You matter more than your pain is telling you right now.",
  "This pain is intense, but it is not the truth of who you are.",
  "You are loved, even if it doesn’t feel that way right now.",
  "The fact that you're still here means a part of you wants to live. Listen to that part.",
  "Please reach out. You're not a burden — you're a soul worth saving."
],


"i don’t know what to do": [
  "It’s okay to not know. Just breathe — one step will come.",
  "You don’t have to figure everything out right now.",
  "Uncertainty doesn’t mean you’re failing — it means you’re human.",
  "When you don’t know what to do, start with kindness to yourself.",
  "The next step doesn’t need to be big. Just honest.",
  "You’re allowed to feel lost. The way will return.",
  "This confusion won’t last forever. Clarity always comes.",
  "It’s okay to ask for help — you don’t have to do this alone.",
  "Not knowing is not weakness. It’s the start of discovery.",
  "Even in this moment, you are enough."
],

"want to disappear": [
  "Wanting to disappear doesn’t make you broken — it makes you overwhelmed.",
  "You don’t need to vanish — you need someone to truly see you.",
  "You’re not too much. You just need a place to feel safe.",
  "The urge to disappear is a cry for peace. You deserve that peace.",
  "You’re not alone — and you are not a burden.",
  "Even when it feels like fading away, your presence still matters.",
  "You don’t have to disappear to stop the pain. You need space to heal.",
  "Please don’t hide. Someone out there wants to understand you.",
  "You’re not invisible. You’re just tired.",
  "You deserve to be seen, supported, and held — not erased."
],

"stress": [
  "You’re under a lot — no wonder it feels heavy. Be gentle with yourself.",
  "Stress is not a sign of weakness. It’s a signal to slow down.",
  "You don’t have to carry everything at once. One step at a time is enough.",
  "You’re allowed to rest without guilt.",
  "Even in stress, you’re still doing your best. That matters.",
  "You’re human — not a machine. You deserve space to breathe.",
  "Let go of perfection. Peace lives in the small moments.",
  "Take a deep breath — and let one thing go.",
  "Stress comes and goes, but your strength remains.",
  "It’s okay to step back. That’s not quitting — it’s caring for yourself."
],

"give up": [
  "You’ve made it through so much already. Don’t let this moment be the end of your strength.",
  "It’s okay to feel like giving up — just don’t give in to it.",
  "Rest if you must, but don’t quit. The next chapter might be the one that changes everything.",
  "This feeling is heavy, but it’s not forever. You’re allowed to pause, not to end.",
  "You’re not weak for feeling this way — you’re just exhausted from carrying so much.",
  "You’ve come too far to stop now. Let yourself breathe, then try again.",
  "Sometimes the bravest thing is simply staying one more day. You can.",
  "You’re not a failure — you’re a fighter who’s tired. That’s different.",
  "Even the strongest people think of giving up. But the strongest also stay.",
  "Please hold on. You don’t have to do this alone. You are worth the fight."
],


"what’s the point": [
  "The point isn’t always clear — but it’s there, waiting to be revealed.",
  "You don’t have to know the point to keep going. Sometimes surviving is the purpose.",
  "Even when it all feels pointless, your breath still holds value.",
  "This pain won’t last forever. The meaning often comes after the storm.",
  "You are not lost — you are searching, and that matters.",
  "Not knowing the point doesn’t mean you have no worth.",
  "Keep moving. The point may be just ahead.",
  "You’ve gotten through this far — that means something.",
  "Let today be about existing. That’s enough.",
  "Purpose isn’t always visible — but it always finds you in time."
],
"why me": [
  "Because you are strong enough to rise through this — even if you don’t feel it now.",
  "This isn’t punishment — it’s pain asking to be transformed.",
  "You weren’t chosen to suffer — you’re just surviving something hard.",
  "There’s no fair answer. But there is healing.",
  "Your pain is real — and you are allowed to question it.",
  "You didn’t deserve this — and you still deserve love.",
  "You are not your suffering. You are your survival.",
  "Others may not see it, but you’ve been carrying so much.",
  "This storm chose you — but so will peace.",
  "It’s okay to ask why. And still keep going."
],
  "nothing matters": [
  "When nothing feels like it matters, it’s a sign you’ve been carrying too much for too long.",
  "This numbness is a defense — not your truth.",
  "Underneath the emptiness is someone who still wants to care.",
  "You matter, even when it feels like nothing does.",
  "This feeling will pass. Hold on through the fog.",
  "Even if nothing feels meaningful, *you* still are.",
  "The world hasn’t seen the full strength of your heart yet.",
  "Sometimes, survival is enough. Meaning will return.",
  "You’re still here — and that alone matters.",
  "When nothing matters, choose kindness. It’s a start."
],
"want to end it": [
  "You don’t want life to end — you want the pain to stop. And there are other ways.",
  "This isn’t the end — it’s a breaking point. But not your breaking.",
  "Let someone in. You don’t have to carry this alone.",
  "Even now, your story is not over.",
  "The pain is real — but so is the help available to you.",
  "You are loved, even when it feels impossible.",
  "Endings are not the answer. Support is.",
  "Hold on — even one more breath is a victory.",
  "You’ve come so far. Please stay a little longer.",
  "You are not alone. Help exists, and hope still lives."
],
"can’t take this": [
  "You’ve taken more than most. You are stronger than you know.",
  "It’s okay to collapse — but don’t disappear.",
  "You’re allowed to say ‘this is too much.’",
  "Let go of carrying it alone — reach out.",
  "You don’t have to take it. You can ask for help.",
  "The pressure isn’t your fault — it’s your cue to pause.",
  "You are not weak for breaking. You’re human.",
  "What you’re carrying is too heavy — but you’re not alone.",
  "Your pain is real. Your life still matters.",
  "When it’s too much, take one breath at a time."
],
"no reason to live": [
  "It may feel like there’s no reason — but your existence is already enough.",
  "Reasons come and go — but your worth stays.",
  "The fact that you’re still here is proof of unseen strength.",
  "Let this moment pass. Let life show you why you stayed.",
  "You may not see the reason now — but that doesn’t mean it isn’t coming.",
  "You are not alone in this darkness. Others have made it through.",
  "Don’t believe this thought. You are needed.",
  "Your pain lies — your presence is a light.",
  "Even if you don’t feel it, you are valuable.",
  "Give life a chance to surprise you again."
],
"tired of life": [
  "You’re tired because life has been heavy — not because you are weak.",
  "It’s okay to feel tired of life. Just don’t give up on it yet.",
  "You don’t need to keep pushing — just rest.",
  "Sometimes survival looks like slowing down.",
  "You are allowed to be tired — and still keep going.",
  "Tired isn’t the end. It’s a call for healing.",
  "Let yourself breathe without expectations.",
  "You are not lazy — you are overwhelmed.",
  "You’ve carried enough. It’s time to care for you.",
  "You deserve to feel alive again — and you will."
],
"need help": [
  "Asking for help is the bravest thing you can do.",
  "You don’t have to do this alone — and you shouldn’t.",
  "Help exists — and you are worthy of receiving it.",
  "Needing help doesn’t make you weak — it makes you human.",
  "There is no shame in reaching out. Only strength.",
  "You are not a burden — you are a soul worth supporting.",
  "Let someone in. Even one step can change everything.",
  "You’re allowed to need more than you’re currently receiving.",
  "Help is not just for others — it’s for you too.",
  "You matter enough to be helped. Please don’t forget that."
],

"unseen": [
  "Being unseen doesn’t mean you’re unworthy — it means others need better vision.",
  "You don’t need to be loud to be valuable.",
  "You are radiant, even if they don’t notice.",
  "You see yourself more clearly than anyone else — honor that.",
  "You’re not invisible — just unrecognized. And that will change.",
  "Some people miss brilliance because they’re not looking for it.",
  "Even in shadows, you are still powerful.",
  "You are not the absence — you are the light waiting to be noticed.",
  "You’re allowed to shine quietly.",
  "Being unseen says nothing about your worth."
],
"nobody cares": [
  "It can feel like nobody cares — but your pain still matters.",
  "You may feel invisible, but you are not forgotten.",
  "Someone, somewhere would be honored to know what you’re going through.",
  "You are deeply important, even when it feels otherwise.",
  "Let this be a moment, not a truth. You are cared for.",
  "Sometimes the world feels silent, but that doesn’t mean you don’t matter.",
  "Your voice deserves to be heard — keep speaking.",
  "Even if it feels like no one cares, I do. And I’m here.",
  "You’re not a burden — you’re a human needing love.",
  "Don’t believe the silence — you still belong."
],
"ignore": [
  "Being ignored hurts — but your worth isn’t tied to someone else’s attention.",
  "You don’t need their validation to be valuable.",
  "Silence from others doesn’t mean silence from the universe.",
  "Let their absence teach you how to show up for yourself.",
  "You deserve to be seen, not overlooked.",
  "You are not the silence — you are the soul beyond it.",
  "You are not made to be ignored — you are made to be celebrated.",
  "Even without their words, your truth still speaks.",
  "Keep shining. The right ones will notice.",
  "Being ignored says more about them than it does about you."
],
"abandon": [
  "Being abandoned is heartbreaking — but you are still whole.",
  "You are not what they left. You are what remains strong.",
  "Their leaving does not define your value.",
  "Let the pain speak, but don’t let it lie.",
  "You were not too much. They were not enough.",
  "Abandonment is a wound, not your identity.",
  "You deserve people who stay — and they will come.",
  "You’re still lovable, even after loss.",
  "What’s left behind is often the beginning of something new.",
  "You are still here — and that’s courage."
],
"I don’t matter": [
  "You matter — even when it feels like you don’t.",
  "This feeling will pass. Your value won’t.",
  "You are irreplaceable, even when the world is quiet.",
  "Just by existing, you bring something no one else can.",
  "Even in your silence, you are significant.",
  "Don’t believe the lie of worthlessness. You are needed.",
  "Someone out there would be changed by your story.",
  "You matter — not for what you do, but for who you are.",
  "The world is better with you in it.",
  "You are not invisible. You are impactful beyond measure."
],
"no one understands": [
  "It’s painful to feel misunderstood — but you are still real, still valid.",
  "Your experience is uniquely yours — and that’s beautiful.",
  "There are those who will understand — don’t stop reaching.",
  "Your truth deserves space, even if others can’t hold it yet.",
  "You don’t need everyone to understand — just someone.",
  "You are not alone in your depth.",
  "Being misunderstood doesn’t make you wrong.",
  "You will find your people — and they will *get* you.",
  "Until others understand, honor yourself deeply.",
  "You don’t have to explain yourself to be loved."
],
"forgotten": [
  "You may feel forgotten, but your story still matters.",
  "Just because they don’t remember you doesn’t mean you don’t belong.",
  "You are still here — and that means something powerful.",
  "Being forgotten isn’t the same as being worthless.",
  "You deserve remembrance — and it will come.",
  "Even if others forget, you must remember your strength.",
  "AYou are not a shadow. You are a light waiting to be seen.",
  "Your impact lives on — even if others miss it.",
  "You’re not gone — just hidden. And hidden things still shine.",
  "You matter, whether or not you’re mentioned."
],

"not okay": [
  "It’s okay to not be okay. You don’t have to pretend today.",
  "You’re allowed to feel what you feel — even when it’s messy.",
  "‘Not okay’ is a valid place to be. Let yourself be there without shame.",
  "You don’t need to fix it all right now. Just breathe.",
  "Even in your worst moments, you are still worthy of love and peace.",
  "You’re not failing — you’re feeling. That’s human.",
  "Saying you’re not okay is a powerful act of honesty.",
  "Start small — even one breath is a beginning.",
  "You're not alone, even when everything feels too much.",
  "You don’t have to hold it all. Let someone hold space for you."
],
"losing it": [
  "If it feels like you’re losing it, it’s because you’ve held so much for so long.",
  "You’re allowed to fall apart — it doesn’t mean you’ve failed.",
  "Breathe. This is the breaking point that leads to breakthrough.",
  "You don’t have to keep it all together to be worthy.",
  "Let the pieces fall — you’ll gather them with greater wisdom.",
  "Losing it doesn’t make you broken — it makes you real.",
  "Even in chaos, you’re still worthy of compassion.",
  "You’ve held on so tightly — maybe now is the time to let go, gently.",
  "Sometimes ‘losing it’ is your soul’s cry for rest.",
  "You’re allowed to let go. Healing starts there."
],
"falling apart": [
  "Falling apart is not the end — it’s the beginning of real transformation.",
  "You’re allowed to break — and still be beautiful.",
  "Your heart knows how to rebuild, even from ruins.",
  "Every fall has the seed of a future rise.",
  "Don’t fear the crumble — it’s how you reshape your truth.",
  "You’re not failing. You’re unraveling into something more honest.",
  "Let the pieces fall. You’ll find new wholeness in time.",
  "Even in pieces, your light remains.",
  "You are not your brokenness — you are your becoming.",
  "The world needs your rawness, not your perfection."
],
"spiraling": [
  "Spiraling thoughts don’t mean you’re out of control — they mean you need grounding.",
  "Pause. Breathe. Step back. You are not your spiral.",
  "This cycle can be interrupted. Start with one breath.",
  "Let your awareness guide you back to calm.",
  "You are not drowning — you’re overwhelmed. And that can change.",
  "Spiraling means your brain is seeking safety. Offer it gentleness.",
  "You’ve spiraled before and found your way out. You will again.",
  "The mind spins — but the soul can still be still.",
  "One small anchor can break the spiral.",
  "You’re safe, even when your thoughts say otherwise."
],
"burnt out": [
  "Burnout doesn’t mean you’re weak — it means you’ve been strong for too long without rest.",
  "You’ve given too much. Now it’s time to receive.",
  "You are allowed to pause. Your fire needs tending.",
  "Even flames go dim — they still return.",
  "You’re not failing — you’re depleted. That’s different.",
  "Burnout is your body’s cry for softness, not judgment.",
  "Stop pushing. Start nurturing.",
  "Rest isn’t luxury — it’s essential for your healing.",
  "You don’t need to earn your rest. You deserve it now.",
  "Even in burnout, there’s a light waiting to return."
],
"breaking down": [
  "Breaking down doesn’t mean you’re broken — it means your soul is asking for gentleness.",
  "Let it break. What comes after might be more whole.",
  "Tears, silence, collapse — they’re not weakness. They’re release.",
  "You’re not failing. You’re releasing what’s too heavy.",
  "Let go. The rebuild will begin from here.",
  "Breaking down is honesty your body can no longer hold in.",
  "You’re allowed to be undone — and still be loved.",
  "Every breakdown has within it a turning point.",
  "You don’t have to stop the breakdown. Just be kind in it.",
  "This is not the end. It’s the hard part before the healing."
],
"at my limit": [
  "Reaching your limit doesn’t make you weak — it makes you real.",
  "Limits are not failure — they’re signs to rest and reset.",
  "You’ve done enough. Now breathe.",
  "You weren’t made to carry everything alone.",
  "You’re not expected to go beyond human. Honor your edge.",
  "It’s okay to step back. That’s strength.",
  "Even warriors rest at their limits.",
  "You’re allowed to stop. Nothing needs to break first.",
  "Your limit is not the end — it’s your signal for care.",
  "Listen to your limit. It’s a whisper of self-respect."
],
"mentally tired": [
  "Mental fatigue is real — and you deserve rest just as much as physical exhaustion.",
  "You’re not lazy — your brain is asking for peace.",
  "You’ve been thinking, coping, holding — it’s okay to let go.",
  "Give yourself grace — you’ve done more than enough.",
  "Mental tiredness isn’t weakness — it’s a cry for stillness.",
  "You don’t have to solve everything right now.",
  "Let your thoughts rest. Peace will follow.",
  "You’re carrying so much — let some of it down.",
  "It’s okay to need space. Mental health is health.",
  "Even your mind deserves compassion and care."
],
"can't do this anymore": [
  "When you feel like you can’t anymore, let that be the moment you rest — not end.",
  "You’ve reached the edge — now breathe. You don’t have to jump.",
  "This is not the end. It’s the pause you needed.",
  "You don’t have to keep pushing — let help in.",
  "Even now, when you feel done, you’re still worthy of peace.",
  "Say ‘I can’t’ — and let that be your permission to heal.",
  "You’ve been strong long enough. Let softness meet you here.",
  "Even if you can’t do more, you’ve already done so much.",
  "You’re not broken — you’re exhausted. That’s okay.",
  "Let yourself stop. Let the world wait."
],
  hopeless: [
    "You've survived 100% of your worst days. This is not where your story ends.",
    "Hopelessness is loud — but so is resilience. Let the quiet strength in you speak.",
    "Even the darkest nights end in sunrise. Keep walking.",
    "You’re not stuck. You’re pausing before a breakthrough.",
    "This moment doesn’t define you. The next step does.",
    "Hopeless doesn’t mean helpless. There is still choice in you.",
    "You don’t need all the answers now — just the courage to keep going.",
    "Pain has purpose, and you’re about to discover yours.",
    "The storm is strong, but you are stronger.",
    "You are not alone. The world hasn’t seen the best of you yet."
  ],
  anxious: [
    "Anxiety is not a weakness — it's a signal you're overloaded. Start small. One choice. One shift.",
    "It’s okay to not feel okay. This moment will pass.",
    "Breathe. You’re not late. You’re not behind. You’re just human.",
    "You can’t control everything — and you don’t have to.",
    "Anxiety means your mind is alert. Ground it in this moment.",
    "Let go of 'what if' and return to 'what is'.",
    "Slow down. One deep breath can reset the spiral.",
    "You are not your thoughts. You’re the awareness behind them.",
    "Fear feels loud, but safety is built in small actions.",
    "You’re learning to live with intensity — that’s strength."
  ],
  tired: [
    "Feeling tired isn't failure. It’s your signal to rebuild, not give up.",
    "Rest is not weakness. It’s your right.",
    "Even machines need recharging. So do souls.",
    "You’re not lazy — you’re exhausted from holding it together.",
    "Stop pushing. Start listening to what your body and heart need.",
    "You’re tired because you’ve been strong too long. Rest is brave.",
    "Your worth isn't measured by productivity.",
    "Today, surviving is enough.",
    "It’s okay to pause. You’re not falling behind — you’re healing.",
    "You’re not broken. You’re human, and humans need rest."
  ],
  worthless: [
    "You are not worthless. You’ve just been carrying too much pain in silence.",
    "Your existence alone means you matter.",
    "Worth isn’t earned — it’s remembered.",
    "You’ve been fighting silent battles. That makes you powerful.",
    "If you didn’t matter, this pain wouldn’t hurt so much.",
    "You are needed — exactly as you are.",
    "You can’t see your value when you’re buried in self-doubt.",
    "Even if you don’t feel it now, you are deeply significant.",
    "There is something only you bring to this world.",
    "Your scars are proof you’re still here — and that matters."
  ],
  suicide: [
    "This feels like the end — but it’s the awakening. You’re not done. You’re just getting started.",
    "You are needed. Stay for the you that will rise from this.",
    "What you feel now is not the truth of who you are.",
    "Suicidal thoughts don’t mean you want to die — they mean you want the pain to end. There are other ways.",
    "The world is better with you in it, even if it doesn’t feel that way.",
    "Hold on. Even one breath more is a win.",
    "You don’t have to do this alone. Help exists. So does hope.",
    "This chapter hurts, but the story continues.",
    "You matter more than your pain is telling you.",
    "Let someone in. Light comes in through connection."
  ],
  empty: [
    "Feeling empty doesn’t mean you are. You’re full of quiet strength you haven’t tapped into yet.",
    "Emptiness is often the space before rebirth.",
    "You feel hollow, but you’re still here — and that’s power.",
    "It’s okay to not feel full. It’s a sign to begin again.",
    "The numbness is your body protecting you. Be gentle with it.",
    "You are not empty — you are healing silently.",
    "Stillness feels like emptiness, but it’s the start of growth.",
    "The void you feel can be filled with meaning — one small act at a time.",
    "You’re in the pause between who you were and who you’re becoming.",
    "You are not lost. You’re resting."
  ],
  lost: [
    "Feeling lost means you're in transition. That’s where the next version of you begins.",
    "Being lost is how we find new directions.",
    "You haven’t failed — you’ve outgrown the old path.",
    "Clarity often comes after confusion. Keep walking.",
    "The fog will clear. Trust the process, not the panic.",
    "You are not lost. You are evolving.",
    "Sometimes getting lost is the only way to truly find yourself.",
    "Not knowing is a doorway to new knowing.",
    "You’re in unfamiliar ground because you’re growing.",
    "Let the journey shape you. You don’t need a map yet."
  ],
  broken: [
    "Broken isn’t the end — it’s how light gets in. Healing starts with honesty.",
    "Cracks show where your strength is forming.",
    "You’re not broken — you’re becoming real.",
    "This pain is not permanent. It’s part of your rising.",
    "Brokenness is not a flaw — it’s a step in the rebuild.",
    "Every broken piece can be part of your masterpiece.",
    "You’re still whole, even with pain.",
    "Breakdown comes before breakthrough.",
    "You are not your damage. You’re your decision to rise.",
    "The shattered parts still belong to you — and they are sacred."
  ],
  overwhelm: [
    "When life is too much, stop chasing perfection. Just breathe and take one step.",
    "You don’t have to do everything. Just something.",
    "Overwhelm is a sign to slow, not sprint.",
    "Breathe. Then choose one small, doable action.",
    "It’s okay to say 'enough' today.",
    "You’re allowed to not have it all together.",
    "Small wins matter. Start there.",
    "Even giants take one step at a time.",
    "Overwhelmed means you care deeply — that’s not a flaw.",
    "Everything doesn’t have to be fixed today."
  ],
  depress: [
    "Depression lies — it tells you you’re alone. You’re not.",
    "Even when joy feels impossible, hope is still alive.",
    "This fog is not forever. There is light ahead.",
    "You’re not weak. You’re fighting something invisible and powerful.",
    "Healing doesn’t mean constant happiness — it means presence.",
    "Your presence matters, even when you don’t feel it.",
    "You deserve rest, not guilt.",
    "Even slow healing is healing.",
    "Depression isn’t who you are — it’s what you’re going through.",
    "You’re not a burden. You’re a human in pain."
  ],
  lonely: [
    "Loneliness is the ache of connection unmet — not a flaw in you.",
    "You are not alone, even if it feels like it.",
    "The right connection is still on its way to you.",
    "Your need for others is not weakness — it’s your humanity.",
    "This emptiness is a call for deeper community, not shame.",
    "You deserve to be seen and known.",
    "Loneliness doesn’t define your worth.",
    "Even when you’re alone, you’re loved from afar.",
    "Hold on — there are people who will understand you.",
    "You belong. Don’t give up before you find your people."
  ],
  numb: [
    "Numbness isn’t emptiness — it’s your body’s way of saying ‘too much.’",
    "You’re not broken — you’re protecting yourself.",
    "It’s okay to feel nothing. You’re still real.",
    "This silence inside is survival, not failure.",
    "Don’t force feelings — they will return when it’s safe.",
    "You’re still healing, even when you feel numb.",
    "Your heart is resting. Let it.",
    "You are not your lack of emotion — you are your endurance.",
    "Being numb is not giving up — it’s a pause.",
    "You will feel again, and it will be beautiful."
  ],
  ashamed: [
    "Shame thrives in silence — speak your truth and it loses power.",
    "You are not your worst moment.",
    "Everyone has fallen. What matters is how you rise.",
    "Shame is a lie that says you are your past. You are not.",
    "You deserve compassion — even from yourself.",
    "You are still worthy of love, even when you feel flawed.",
    "Mistakes don’t define you. Growth does.",
    "Healing starts where shame ends — in honesty.",
    "There is no shame in being human.",
    "You can forgive yourself. That is strength, not weakness."
  ],
  insecure: [
    "Insecurity means you're aware — not broken.",
    "Even the most confident people doubt themselves sometimes.",
    "You’re growing — that’s why you feel shaky.",
    "Confidence comes from showing up, not feeling perfect.",
    "You have worth even when you feel unsure.",
    "Your voice matters, even when it trembles.",
    "You don’t have to prove your value — it’s already there.",
    "You can be scared and still show up strong.",
    "Insecurity fades when you lean into your truth.",
    "You’re allowed to be both growing and enough at the same time."
  ],
  angry: [
    "Anger is energy — let it move, not destroy.",
    "It’s okay to feel angry. What matters is what you do with it.",
    "Your anger is valid. Just don’t let it consume you.",
    "Beneath anger is usually pain. Honor both.",
    "You're not wrong for feeling deeply.",
    "Let your anger guide you to truth — not harm.",
    "Even anger is a call for healing.",
    "You can express anger without losing control.",
    "Your fire doesn’t make you bad — it makes you alive.",
    "Use your anger to build something better."
  ],
  afraid: [
    "Fear is not a stop sign — it’s a signal you’re stepping into the unknown.",
    "Courage isn’t the absence of fear — it’s moving through it.",
    "You’ve felt fear before and still made it here.",
    "The unknown is scary — and still, you rise.",
    "You’re braver than the voice that doubts you.",
    "Fear shrinks when faced. You are strong enough.",
    "You are not alone in this. Bravery begins with breath.",
    "Let fear guide you to what matters, not stop you.",
    "Even with fear, you’re still moving forward.",
    "Fear means it matters. That’s worth leaning into."
  ],
  jealous: [
    "Jealousy shows you what you desire — not what you lack.",
    "Your path is different, and it’s still worthy.",
    "There is room for your success, too.",
    "You don’t need to compete — you need to believe.",
    "Let others inspire you, not define you.",
    "Your time is coming — trust the timing of your life.",
    "Comparison hides your own beauty. Look within.",
    "You are not behind — you’re on your path.",
    "Your journey doesn’t need to match theirs to be meaningful.",
    "Celebrate others — and know your light is no less bright."
  ],
  grief: [
    "Grief is the price of deep love — and it’s sacred.",
    "You don’t have to rush healing. Grief has no timeline.",
    "This ache is proof you loved deeply.",
    "It’s okay to smile and cry in the same breath.",
    "You are allowed to feel everything — and nothing — in grief.",
    "Grief changes you, but it doesn’t end you.",
    "You carry them not in pain, but in memory.",
    "Loss is a wound — healing doesn’t mean forgetting.",
    "You’re not broken — you’re mourning something precious.",
    "Grief comes in waves. Let them move through you gently."
  ],
  regret: [
    "Regret means you’ve grown — you see things differently now.",
    "You can’t change the past, but you can choose the next step.",
    "Forgiveness begins with yourself.",
    "Regret is a teacher, not a sentence.",
    "You were doing the best you could with what you knew then.",
    "You deserve to move forward — gently.",
    "Mistakes do not make you unworthy.",
    "You’re still becoming. Keep choosing better.",
    "Let regret open your heart, not close it.",
    "What matters now is who you choose to be."
  ],
  panic: [
    "Take a deep breath — even now, you are safe.",
    "Panic means your body is trying to protect you. Thank it. Then ground.",
    "You are not your fear — you are the calm that follows.",
    "The moment will pass — breathe through it.",
    "Hold your heart. You're not broken — you're overwhelmed.",
    "You’ve survived this before. You can again.",
    "Even when it feels out of control, you can return to your breath.",
    "You’re not dying — you’re feeling intensely.",
    "You’re strong for noticing the spiral — now step out of it.",
    "You are safe, even when your body forgets."
  ],
  sad: [
      "Sadness is not weakness. It means you’re human and feeling deeply.",
      "Let the tears fall — they water the soil where strength grows.",
      "Even sadness has a purpose. Let it guide you inward, not defeat you.",
      "You don’t have to hide your sadness — it’s okay to not be okay.",
      "Feel it. Then breathe. Then rise again.",
      "This sadness will not last forever. Let time work its quiet healing.",
      "You’re allowed to feel broken — and still be whole.",
      "Even sadness is part of your becoming.",
      "You are not alone. Your pain matters.",
      "Sometimes sadness is your soul saying, ‘something must change.’"
    ],
    cry: [
      "Tears don’t mean you're weak. They mean you’ve been strong for too long.",
      "Let it out. Crying is a sacred release.",
      "Your tears are proof you feel deeply — and that is beautiful.",
      "Every tear holds healing. Let it wash through you.",
      "Crying doesn’t mean defeat — it means release.",
      "You are allowed to cry. You are allowed to feel.",
      "Tears are words your heart can’t say out loud.",
      "After the tears comes clarity. Hold on.",
      "Let the storm pass. You’ll feel lighter after.",
      "You’re allowed to grieve — even for the things no one else sees."
    ],
    down: [
      "Feeling down isn’t failure — it’s a pause before your rise.",
      "Even the strongest people feel down sometimes.",
      "This moment is heavy, but it won’t last forever.",
      "Your energy is low — not your worth.",
      "You’re still enough, even when you're not your best.",
      "It’s okay to sit in this feeling for a while — then get back up.",
      "You are not your down days. You are everything that carries you through them.",
      "Let this be a reminder to rest, not to quit.",
      "You’ve made it through other lows — you will rise again.",
      "It’s okay to feel off. Grace is allowed here."
    ],
    blue: [
      "Feeling blue is a signal to turn inward, not give up.",
      "You don’t have to explain the blues — just feel them and let them pass.",
      "Even cloudy days serve a purpose.",
      "There is beauty even in the blue.",
      "This phase isn’t permanent. Your light will return.",
      "Be gentle with yourself — the storm will pass.",
      "You don’t need to fight the blue — just float with it until it fades.",
      "Feel what you feel — then return to your strength.",
      "Being blue doesn’t erase your worth.",
      "There’s still hope — even when joy feels far away."
    ],
    miserable: [
      "Feeling miserable doesn’t make you a burden — it makes you real.",
      "This misery is asking for your attention — not your punishment.",
      "You won’t feel like this forever — even now, healing is beginning.",
      "Misery isn’t your identity — it’s your current weather.",
      "You're allowed to feel miserable and still be worthy of joy.",
      "Every emotion has its time. This one, too, will pass.",
      "Misery often comes before rebirth — let it be a signal, not a sentence.",
      "You’ve felt lost before. But you’ve never stayed there forever.",
      "You are not your darkest moment.",
      "It’s okay to hurt. What matters is you don’t hurt alone."
    ],
    empty: [
      "Feeling empty doesn’t mean you are. You’re full of quiet strength you haven’t tapped into yet.",
      "Emptiness is often the space before rebirth.",
      "You feel hollow, but you’re still here — and that’s power.",
      "It’s okay to not feel full. It’s a sign to begin again.",
      "The numbness is your body protecting you. Be gentle with it.",
      "You are not empty — you are healing silently.",
      "Stillness feels like emptiness, but it’s the start of growth.",
      "The void you feel can be filled with meaning — one small act at a time.",
      "You’re in the pause between who you were and who you’re becoming.",
      "You are not lost. You’re resting."
    ],
    low: [
      "Low moments don’t mean you’re failing — they mean you’re real.",
      "You’ve felt low before, and still rose again.",
      "Low energy is a signal to slow down — not give up.",
      "Even at your lowest, you have value.",
      "There is no shame in struggling — it means you’re trying.",
      "You can feel low and still be deeply loved.",
      "Your low isn’t permanent. Neither is the pain.",
      "This is a chapter — not your whole story.",
      "You deserve care — especially in your lowest times.",
      "Let the low be a resting place, not a stopping point."
    ],
    drain: [
      "You’re drained because you’ve been strong. Rest now.",
      "Fatigue is your body’s request for kindness.",
      "You are not lazy — you’re worn thin by life’s weight.",
      "You don’t have to keep giving when your cup is empty.",
      "Your exhaustion is valid. Let yourself pause.",
      "You deserve to be refilled — not just used up.",
      "Even batteries need charging. So do souls.",
      "Drained doesn’t mean defeated — just that you need a break.",
      "Rest is productive. Let it happen.",
      "You’re not failing — you’re fatigued. Be kind to you."
    ],
    "nothing matters": [
      "When nothing feels like it matters, it’s a sign you’ve been carrying too much for too long.",
      "This numbness is a defense — not your truth.",
      "Underneath the emptiness is someone who still wants to care.",
      "You matter, even when it feels like nothing does.",
      "This feeling will pass. Hold on through the fog.",
      "Even if nothing feels meaningful, *you* still are.",
      "The world hasn’t seen the full strength of your heart yet.",
      "Sometimes, survival is enough. Meaning will return.",
      "You’re still here — and that alone matters.",
      "When nothing matters, choose kindness. It’s a start."
    ],
    "emotionally exhaust": [
      "Emotional exhaustion is a sign you’ve felt deeply for too long.",
      "You’ve carried more than your share — it’s okay to rest.",
      "You don’t have to be strong all the time.",
      "Emotional fatigue means you’ve been brave too long. Breathe.",
      "Let yourself pause. You’ve earned stillness.",
      "Being emotionally tired doesn’t mean you’re broken — it means you care.",
      "You are not weak — you’re worn from carrying too much alone.",
      "Your heart deserves healing — not hustle.",
      "Even the strongest souls need time to recover.",
      "You don’t have to hold everything. Let some of it go."
    ]
};
const THANKS_KEYWORDS = new Set([
  "thank",
  "thanks",
  "thankyou",
  "appreciate",
  "grateful"
]);

function displayName(user) {
  return user?.user_metadata?.username || user?.email || "friend";
}

export default function ChatPage() {
  const [folderName, setFolderName] = useState("");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [lastEmotions, setLastEmotions] = useState([]);
  const [emotionHistory, setEmotionHistory] = useState({});
  const [savedChats, setSavedChats] = useState([]);
  const [showSaved, setShowSaved] = useState(false);
  const [user, setUser] = useState(null);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const chatRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    
    // Check if we're in demo mode
    const isDemo = !process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    setIsDemoMode(isDemo);

    const loadSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();

        if (!session?.user) {
          await supabase.auth.signOut();
          router.push("/login");
        } else {
          setUser(session.user);
        }
      } catch (err) {
        console.error("Supabase Auth error:", err);
        await supabase.auth.signOut();
        router.push("/login");
      }
    };

    loadSession();
  }, [router]);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  function levenshtein(a, b) {
    const dp = Array.from({ length: a.length + 1 }, () => []);
    for (let i = 0; i <= a.length; i++) dp[i][0] = i;
    for (let j = 0; j <= b.length; j++) dp[0][j] = j;
    for (let i = 1; i <= a.length; i++) {
      for (let j = 1; j <= b.length; j++) {
        dp[i][j] = Math.min(
          dp[i - 1][j] + 1,
          dp[i][j - 1] + 1,
          dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
        );
      }
    }
    return dp[a.length][b.length];
  }

  function fuzzyMatch(word, targets, threshold = 2, minLength = 3) {
    if (word.length < minLength) return null;
    for (const target of targets) {
      if (levenshtein(word, target) <= threshold) {
        return target;
      }
    }
    return null;
  }

  function randomAwakening() {
    return combinedAwakenings[Math.floor(Math.random() * combinedAwakenings.length)];
  }

  async function generateBotReplies(userInput) {
  if (!user) {
    return ["Hold on a moment while I load your account..."];
  }

  const normalizedText = userInput
  .toLowerCase()
  .replace(/[^\w\s]/gi, "")  // Remove punctuation
  .replace(/\s+/g, " ")      // Normalize multiple spaces
  .trim();


  const responses = [];

                 // Remove leading/trailing space

  const words = normalizedText.split(/\s+/);
  const joined = words.join(" ");

  const greetings = ["hi", "hello", "hey", "wassup", "yo"];
  const islamic = ["assalamualaikum", "salam"];
  const positiveFollowUps = ["more", "ok", "sure", "yes", "please"];

  const isOnlyGreeting = greetings.includes(normalizedText);
  const hasGreeting = greetings.some(g => normalizedText.startsWith(g));

  // ✅ Only return greeting if that's the *whole* message
  if (isOnlyGreeting) {
    return [`Hi ${displayName(user)}!`];
  }

  if (words.some((w) => fuzzyMatch(w, islamic))) {
    return [`Waalaikumsalam ${displayName(user)}!`];
  }


// Check if the entire input is basically a thanks phrase or very short and mostly thanks words
const gratitudePatterns = [
  "thank you",
  "thanks a lot",
  "i appreciate",
  "really appreciate",
  "thank u",
  "thanks",
  "thx",
  "grateful",
  "thankful"
];

const emotionRegex = new RegExp(
  Object.keys(emotionTriggers)
    .map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join("|"),
  "i"
);

const containsGratitude = gratitudePatterns.some((pattern) =>
  normalizedText.includes(pattern)
);

const isGratitudeOnly = containsGratitude && !joined.match(emotionRegex);





if (isGratitudeOnly) {
  setLastEmotions([]);
  return [
    `You're welcome ${displayName(user)} — Don't watch the sunrise but LET THE SUN WATCH YOU RISE. K.`,
  ];
}


  // ✅ Emotion detection
  const detected = new Set();
  const triggers = Object.keys(emotionTriggers);

// Normalize the input text once
triggers.forEach((trigger) => {
  const normalizedTrigger = trigger.toLowerCase();
  const triggerWords = normalizedTrigger.split(" ");

  // Phrase match (e.g. "feel tired", "no hope left")
  const phraseMatch = normalizedText.includes(normalizedTrigger);



  // Fuzzy single word match (e.g. "hopeless", "tired", "anxious")
  const fuzzyWordMatch =
    triggerWords.length === 1 &&
    words.some((word) => fuzzyMatch(word, [normalizedTrigger]));

  if (phraseMatch || fuzzyWordMatch) {
    detected.add(trigger);
  }
});


  if (detected.size > 0) {
    setLastEmotions([...detected]);
    setEmotionHistory({});

    if (hasGreeting) {
      responses.push(`Hi ${displayName(user)}!`);
    }

    const awakening = randomAwakening();
    responses.push(awakening);

    detected.forEach((key) => {
      const phrases = emotionTriggers[key];
      const idx = Math.floor(Math.random() * phrases.length);
      responses.push(phrases[idx]);
      setEmotionHistory((prev) => ({
        ...prev,
        [key]: [idx],
      }));
    });

    responses.push("Type more if you'd like to continue.");
    return responses;
  }

  // ✅ Positive follow-up
  if (
    lastEmotions.length &&
    positiveFollowUps.some((w) => normalizedText.includes(w))
  ) {
    responses.push(randomAwakening());

    lastEmotions.forEach((key) => {
      const used = emotionHistory[key] || [];
      const available = emotionTriggers[key].filter(
        (_, idx) => !used.includes(idx)
      );

      if (available.length) {
        const randomIdx = Math.floor(Math.random() * available.length);
        const phrase = available[randomIdx];
        const globalIdx = emotionTriggers[key].indexOf(phrase);
        setEmotionHistory((prev) => ({
          ...prev,
          [key]: [...(prev[key] || []), globalIdx],
        }));
        responses.push(phrase);
      } else {
        responses.push("I've shared all I have for that. You're truly seen.");
      }
    });

    return responses;
  }

  return getAIReply(userInput);
}



  function handleSend() {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { sender: "You", text: input }]);

    if (!user) {
      setMessages((prev) => [
        ...prev,
        { sender: "Bot", text: "Hold on a moment while I load your account..." }
      ]);

      const interval = setInterval(() => {
        if (user) {
          clearInterval(interval);
          generateBotReplies(input).then((botReplies) => {
  botReplies.forEach((reply) => {
    setMessages((prev) => [...prev, { sender: "Bot", text: reply }]);
  });
});
        }
      }, 200);

      setInput("");
      return;
    }

    generateBotReplies(input).then((botReplies) => {
  botReplies.forEach((reply) => {
    setMessages((prev) => [...prev, { sender: "Bot", text: reply }]);
  });
});
    setInput("");
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

async function getAIReply(userInput) {
  const response = await fetch("/api/ai", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message: userInput }),
  });

  const data = await response.json();
  return [data.reply || "Sorry, something went wrong."];
}


  async function handleSave() {
    const { data: { session } } = await supabase.auth.getSession();
    const user = session?.user;

    if (!user) {
      router.push("/login");
      return;
    }

    if (!folderName.trim()) {
      alert("Please enter a folder name before saving the chat.");
      return;
    }

    if (isDemoMode) {
      alert("🎭 Demo Mode: Chat would be saved to Supabase in production!");
      setFolderName("");
      setMessages([]);
      return;
    }

    const { error } = await supabase
      .from("saved_chats")
      .insert(
        messages.map((m) => ({
          user_id: user.id,
          sender: m.sender,
          text: m.text,
          folder_name: folderName.trim(),
        }))
      );

    if (error) {
      console.error("Save error:", error);
    } else {
      alert("Chat saved!");
      setFolderName("");
      setMessages([]);
    }
  }

  async function handleViewSaved() {
    const { data: { session } } = await supabase.auth.getSession();
    const user = session?.user;

    if (!user) {
      router.push("/login");
      return;
    }

    if (isDemoMode) {
      // Show demo saved chats
      const demoChats = {
        "Demo Folder 1": [
          {
            sender: "You",
            text: "Hello, I'm feeling down today",
            created_at: new Date(Date.now() - 86400000).toISOString(),
          },
          {
            sender: "Bot",
            text: "I'm here for you. Tell me more about what's on your mind.",
            created_at: new Date(Date.now() - 86400000 + 1000).toISOString(),
          },
        ],
        "Demo Folder 2": [
          {
            sender: "You",
            text: "Thank you for being here",
            created_at: new Date(Date.now() - 172800000).toISOString(),
          },
          {
            sender: "Bot",
            text: "You're welcome demo@example.com — let the sun watch you rise.",
            created_at: new Date(Date.now() - 172800000 + 1000).toISOString(),
          },
        ],
      };
      setSavedChats(demoChats);
      setShowSaved(true);
      return;
    }

    const { data, error } = await supabase
      .from("saved_chats")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: true });

    if (error) {
      console.error("View error:", error);
    } else {
      const grouped = {};
      data.forEach((chat) => {
        const folder = chat.folder_name || "No Folder";
        if (!grouped[folder]) grouped[folder] = [];
        grouped[folder].push(chat);
      });
      setSavedChats(grouped);
    }

    setShowSaved(true);
  }

 return (
  <AuthGuard>
    <div className="min-h-screen bg-gray-100 flex justify-center items-start py-10">
      <div className="max-w-xl w-full bg-white p-8 rounded shadow space-y-6">
        {isDemoMode && (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
            <p className="text-sm">
              🎭 <strong>Demo Mode:</strong> Chat functionality works with simulated data. 
              In production, chats would be saved to Supabase.
            </p>
          </div>
        )}
        
        <div className="mb-4 flex justify-between items-center">
  <h2 className="text-2xl font-bold mb-6">Chat</h2>
  <button
    onClick={() => router.push("/")}
    className="text-sm text-white bg-black hover:bg-gray-800 px-3 py-1 rounded"
  >
    Home
  </button>
</div>

<div
  ref={chatRef}
  className="border border-gray-300 p-4 rounded bg-white h-96 overflow-y-auto flex flex-col gap-4"
>
  {messages.map((msg, i) => (
    <div
      key={i}
      className={`max-w-[80%] whitespace-pre-wrap px-4 py-3 rounded-lg shadow ${
        msg.sender === "You"
          ? "self-end bg-[#2e3a59] text-right border border-[#40567a]"
          : "self-start bg-[#2b2b2b] text-left border border-[#3c3c3c]"
      }`}
    >
      <div className="text-sm font-medium text-gray-200 mb-1">
  {msg.sender === "Bot" ? "Asahi" : msg.sender}
</div>

      <div
        className="text-gray-100 text-[15px] leading-relaxed"
        dangerouslySetInnerHTML={{
          __html:
            msg.sender === "Bot"
              ? msg.text
              : escapeHtml(msg.text),
        }}
      />
    </div>
  ))}
</div>






<div className="flex flex-col gap-2 mb-2">

  {/* Row 1: Message input + Send */}
  <div className="flex gap-2">
    <input
      value={input}
      onChange={(e) => setInput(e.target.value)}
      onKeyDown={handleKeyDown}
      className="flex-1 border p-2 rounded"
      placeholder="Write your toughts..."
    />
    <button
      onClick={handleSend}
      className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
    >
      Send
    </button>
  </div>

  {/* Row 2: Folder name + Save + View */}
  <div className="flex gap-2">
    <input
      value={folderName}
      onChange={(e) => setFolderName(e.target.value)}
      className="flex-1 border p-2 rounded"
      placeholder="Enter folder name (optional)"
    />
    <button
      onClick={handleSave}
      className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
    >
      Save Chat
    </button>
    <button
      onClick={() => {
        if (showSaved) {
          setShowSaved(false);
        } else {
          handleViewSaved();
        }
      }}
      className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
    >
      {showSaved ? "Hide Saved" : "View Saved"}
    </button>
  </div>
</div>





        {showSaved && (
          <div className="mt-4 border p-3 rounded bg-gray-100 max-h-64 overflow-y-auto">
            <h3 className="font-bold mb-2">Saved Chats</h3>
            {Object.entries(savedChats).map(([folder, chats]) => (
              <div key={folder} className="mb-6 border rounded p-3 bg-white shadow">
                <h4 className="font-bold text-lg text-purple-700 mb-4">
                  📁 Folder: {folder}
                </h4>
                {chats.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`mb-2 p-2 rounded ${
                      msg.sender === "You"
                        ? "bg-blue-50 text-right"
                        : "bg-purple-50 text-left"
                    }`}
                  >
                    <div className="text-xs text-gray-400 mb-1">
                      {msg.sender} — {new Date(msg.created_at).toLocaleString()}
                    </div>
                    <div
                      dangerouslySetInnerHTML={{
                        __html:
                          msg.sender === "Bot"
                            ? msg.text
                            : escapeHtml(msg.text),
                      }}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  </AuthGuard>
);
}
