import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Trophy, 
  CheckCircle2, 
  XCircle, 
  ChevronRight, 
  ChevronLeft, 
  Star, 
  Zap,
  Home,
  RefreshCw,
  Award,
  Play,
  ArrowRight
} from 'lucide-react';

// --- DATA: Kapittel-innhold og oppgaver basert på dokumentet ---
const CHAPTERS = [
  {
    id: 1,
    title: "hvis / vis",
    explanation: "Hvis er en subjunksjon som uttrykker en betingelse (dersom). Vis kan være et substantiv (en måte) eller et verb (imperativ av å vise).",
    tips: "Test: Kan du bytte det ut med 'dersom'? Bruk 'hvis'. Er det en kommando? Bruk 'vis'.",
    questions: [
      { text: "Slik hadde valget gått ___ alle kunne stemme.", options: ["hvis", "vis"], correct: "hvis" },
      { text: "Vær så snill og ___ oss respekt.", options: ["hvis", "vis"], correct: "vis" },
      { text: "Du får bot ___ du ikke fjerner vraket.", options: ["hvis", "vis"], correct: "hvis" },
      { text: "De åpnet sesongen på perfekt ___.", options: ["hvis", "vis"], correct: "vis" },
      { text: "___ meg hvor du har gjemt den!", options: ["Hvis", "Vis"], correct: "Vis" },
      { text: "Kontakt legevakten bare ___ det er akutt.", options: ["hvis", "vis"], correct: "hvis" }
    ]
  },
  {
    id: 2,
    title: "hjemme / gjemme",
    explanation: "Hjemme beskriver et sted (ro på bosted). Gjemme er en handling (å skjule noe).",
    tips: "Spør: Er det et sted (hjemme) eller noe man gjør (gjemme)?",
    questions: [
      { text: "Det er så kjedelig å bare sitte ___.", options: ["hjemme", "gjemme"], correct: "hjemme" },
      { text: "Hun måtte ___ seg for fansen.", options: ["hjemme", "gjemme"], correct: "gjemme" },
      { text: "Heltene er endelig ___ i Norge.", options: ["hjemme", "gjemme"], correct: "hjemme" },
      { text: "Vi måtte ___ alt rotet i skapet.", options: ["hjemme", "gjemme"], correct: "gjemme" },
      { text: "Kan du ___ nøkkelen under matta?", options: ["hjemme", "gjemme"], correct: "gjemme" }
    ]
  },
  {
    id: 3,
    title: "hver / vær",
    explanation: "Hver viser til alle enkeltelementer (fordeling). Vær er enten meteorologisk (vær og vind) eller imperativ av 'å være'.",
    tips: "Husk: 'Hver dag' (alle dager), men 'Fint vær' eller 'Vær snill'.",
    questions: [
      { text: "I dag er det veldig dårlig ___.", options: ["hver", "vær"], correct: "vær" },
      { text: "___ snill å følge med i timen.", options: ["Hver", "Vær"], correct: "Vær" },
      { text: "Jeg sykler til skolen ___ dag.", options: ["hver", "vær"], correct: "hver" },
      { text: "___ oppmerksom på glatte veier.", options: ["Hver", "Vær"], correct: "Vær" },
      { text: "Han står opp tidlig ___ morgen.", options: ["hver", "vær"], correct: "hver" }
    ]
  },
  {
    id: 4,
    title: "vill / vil",
    explanation: "Vil er et modalverb (ønske/fremtid). Vill er et adjektiv (utemmet, ukontrollert).",
    tips: "En l (vil) = lyst til. To l-er (vill) = gal/utemmet.",
    questions: [
      { text: "Det var ___ jubel da vi vant.", options: ["vil", "vill"], correct: "vill" },
      { text: "Jeg ___ ikke gjøre det igjen.", options: ["vil", "vill"], correct: "vil" },
      { text: "Mange ___ ha ekte juletre.", options: ["vil", "vill"], correct: "vil" },
      { text: "Jeg gikk meg ___ i den store byen.", options: ["vil", "vill"], correct: "vill" },
      { text: "Er laksen fra oppdrett eller er den ___?", options: ["vil", "vill"], correct: "vill" }
    ]
  },
  {
    id: 5,
    title: "hvite / vite",
    explanation: "Vite er et verb (ha kunnskap). Hvite er adjektivet hvit i flertall/bestemt form.",
    tips: "Kunnskap = vite. Farge = hvite.",
    questions: [
      { text: "Det er helt umulig å ___.", options: ["hvite", "vite"], correct: "vite" },
      { text: "Bakkene har blitt helt ___ etter snøen.", options: ["hvite", "vite"], correct: "hvite" },
      { text: "Hva trenger du å ___ før du kjøper bil?", options: ["hvite", "vite"], correct: "vite" },
      { text: "Jeg spiller med ___ brikker i sjakk.", options: ["hvite", "vite"], correct: "hvite" },
      { text: "Han vil ___ sannheten.", options: ["hvite", "vite"], correct: "vite" }
    ]
  },
  {
    id: 6,
    title: "viste / visste",
    explanation: "Viste er fortid av å vise (presentere). Visste er fortid av å vite (kunnskap).",
    tips: "Vis-te (så det). Viss-te (hadde det i hodet).",
    questions: [
      { text: "Det var ingen som ___ noe om det.", options: ["viste", "visste"], correct: "visste" },
      { text: "De ___ sin kjærlighet til hverandre.", options: ["viste", "visste"], correct: "viste" },
      { text: "Jeg ___ ikke at du var her.", options: ["viste", "visste"], correct: "visste" },
      { text: "Da han kom, ___ vi ham huset.", options: ["viste", "visste"], correct: "viste" },
      { text: "Han ___ at de ikke hadde råd.", options: ["viste", "visste"], correct: "visste" }
    ]
  },
  {
    id: 7,
    title: "og eller å",
    explanation: "Å brukes foran infinitiv (kun ett verb). Og binder sammen to ord eller setninger.",
    tips: "Sitter OG skriver (to ting samtidig). Liker Å lese (infinitiv).",
    questions: [
      { text: "De ble gående ___ vente.", options: ["og", "å"], correct: "og" },
      { text: "Hun begynte ___ bli trøtt.", options: ["og", "å"], correct: "å" },
      { text: "Jeg sto ___ stirret ut av vinduet.", options: ["og", "å"], correct: "og" },
      { text: "Det er gøy ___ lære norsk.", options: ["og", "å"], correct: "å" },
      { text: "Hun likte ___ lese ___ skrive dikt.", options: ["å / og", "og / og", "å / å"], correct: "å / og" }
    ]
  },
  {
    id: 8,
    title: "sammen / samme",
    explanation: "Sammen betyr i fellesskap. Samme betyr identisk.",
    tips: "Vi bor sammen. Vi har samme adresse.",
    questions: [
      { text: "De to er ___.", options: ["sammen", "samme"], correct: "sammen" },
      { text: "Vi har ___ far.", options: ["sammen", "samme"], correct: "samme" },
      { text: "Skal vi gjøre noe ___?", options: ["sammen", "samme"], correct: "sammen" },
      { text: "Det er det ___ for meg.", options: ["sammen", "samme"], correct: "samme" },
      { text: "Vi bor i ___ gate.", options: ["sammen", "samme"], correct: "samme" }
    ]
  },
  {
    id: 9,
    title: "midt / mitt",
    explanation: "Midt beskriver plassering (sentrum). Mitt viser eierskap (intetkjønn).",
    tips: "Midt i blinken. Huset mitt.",
    questions: [
      { text: "Dette er ___ pennal.", options: ["midt", "mitt"], correct: "mitt" },
      { text: "Jeg skjøt pilen ___ i blinken.", options: ["midt", "mitt"], correct: "midt" },
      { text: "Huset ___ ligger ___ i byen.", options: ["midt / mitt", "mitt / midt"], correct: "mitt / midt" },
      { text: "Jeg gjorde ___ beste på testen.", options: ["midt", "mitt"], correct: "mitt" }
    ]
  },
  {
    id: 10,
    title: "for / får",
    explanation: "For er preposisjon/bindeord. Får er et verb (å få/motta/ha lov).",
    tips: "Jeg gjør det for deg. Jeg får en gave.",
    questions: [
      { text: "I dag ___ vi en ny valp.", options: ["for", "får"], correct: "får" },
      { text: "Hun takket ___ maten.", options: ["for", "får"], correct: "for" },
      { text: "Han ___ ikke lov til å gå ut.", options: ["for", "får"], correct: "får" },
      { text: "Musikk er bra ___ sjelen.", options: ["for", "får"], correct: "for" },
      { text: "Jeg ___ endelig vise hva jeg kan.", options: ["for", "får"], correct: "får" }
    ]
  },
  {
    id: 11,
    title: "da / når",
    explanation: "Den gang da, hver gang når. Da brukes om fortid (én gang). Når brukes om fremtid eller gjentakelse.",
    tips: "Da jeg var liten. Når jeg blir stor.",
    questions: [
      { text: "Jeg ble lei meg ___ vi tapte kampen.", options: ["da", "når"], correct: "da" },
      { text: "Vi pleier å tape ___ vi spiller mot dem.", options: ["da", "når"], correct: "når" },
      { text: "I morgen ___ jeg våkner, skal jeg dusje.", options: ["da", "når"], correct: "når" },
      { text: "Hun bruker briller ___ hun leser.", options: ["da", "når"], correct: "når" },
      { text: "Det var seint ___ gjestene dro.", options: ["da", "når"], correct: "da" }
    ]
  },
  {
    id: 12,
    title: "ordstilling (V2)",
    explanation: "I hovedsetninger skal verbet alltid på plass nummer 2.",
    tips: "Inversjon skjer hvis vi starter med tid/sted: 'I dag spiser jeg'.",
    questions: [
      { text: "Hvis du ikke kommer, ___ jeg lei meg.", options: ["jeg blir", "blir jeg"], correct: "blir jeg" },
      { text: "I morgen ___ jeg besøk.", options: ["får", "får jeg"], correct: "får jeg" },
      { text: "Siden du ___ på jobb, møtes vi i dag.", options: ["ikke var", "var ikke"], correct: "ikke var" },
      { text: "I dag ___ solen.", options: ["skinner", "skinner solen"], correct: "skinner solen" }
    ]
  },
  {
    id: 13,
    title: "kvantorer",
    explanation: "Hel/hele (én ting), alle (mange tid), all/alt (utellelig).",
    tips: "Hele kaken (1 kake). Alle kakene (mange kaker). Alt vannet (utellelig).",
    questions: [
      { text: "Han spiste opp ___ kaken.", options: ["hele", "alle"], correct: "hele" },
      { text: "___ elevene ble syke.", options: ["Hele", "Alle"], correct: "Alle" },
      { text: "Har du spist opp ___ maten?", options: ["all", "alle"], correct: "all" },
      { text: "Jeg har gjort ___ jeg kunne.", options: ["alle", "alt"], correct: "alt" }
    ]
  },
  {
    id: 14,
    title: "har / er / blir",
    explanation: "Er (tilstand nå). Har (eierskap/følelse). Blir (endring/fremtid).",
    tips: "Jeg er glad. Jeg har en bil. Jeg blir 20 år.",
    questions: [
      { text: "Jeg ___ 18 år i morgen.", options: ["er", "har", "blir"], correct: "blir" },
      { text: "Hvor mange søsken ___ dere?", options: ["er", "har", "blir"], correct: "har" },
      { text: "Hvis du gjør leksene, ___ du flink.", options: ["er", "har", "blir"], correct: "blir" },
      { text: "Hun ___ fått ny jobb.", options: ["er", "har", "blir"], correct: "har" }
    ]
  },
  {
    id: 15,
    title: "adjektivbøyning",
    explanation: "Adjektivet må speile substantivets kjønn og tall.",
    tips: "-t for intetkjønn (fint), -e for flertall/bestemt (fine).",
    questions: [
      { text: "Jeg bor i et ___ hus.", options: ["grønn", "grønt", "grønne"], correct: "grønt" },
      { text: "Det er many ___ biler her.", options: ["grønn", "grønne"], correct: "grønne" },
      { text: "Han har startet et ___ liv.", options: ["ny", "nytt", "nye"], correct: "nytt" },
      { text: "Hun er ei ___ jente.", options: ["aktiv", "aktivt", "aktive"], correct: "aktiv" }
    ]
  },
  {
    id: 16,
    title: "substantiv",
    explanation: "Ubestemt form (nytt) vs. Bestemt form (kjent).",
    tips: "En mann (hvem som helst). Mannen (den vi snakket om).",
    questions: [
      { text: "Han spiser et ___.", options: ["eple", "eplet"], correct: "eple" },
      { text: "___ er grønt.", options: ["Eple", "Eplet"], correct: "Eplet" },
      { text: "Hva heter den ___ der borte?", options: ["gutt", "gutten"], correct: "gutten" },
      { text: "Hvor mange ___ går i klassen?", options: ["gutt", "gutter"], correct: "gutter" }
    ]
  },
  {
    id: 17,
    title: "possessiver",
    explanation: "Eiendomsord må passe substantivet.",
    tips: "Bilen min (bestemt + min). Min bil (min + ubestemt).",
    questions: [
      { text: "Dette er barna ___.", options: ["min", "mine"], correct: "mine" },
      { text: "Hvor skal vi reise i ferien ___?", options: ["vår", "vårt", "våre"], correct: "vår" },
      { text: "Gjør om: Din bil -> ___", options: ["Bilene dine", "Bilen din"], correct: "Bilen din" },
      { text: "Har du sett huset ___?", options: ["vår", "vårt", "våre"], correct: "vårt" }
    ]
  },
  {
    id: 18,
    title: "ordfamilier",
    explanation: "Ord med samme stamme, men ulike roller.",
    tips: "Verb (å fiske), Ting (en fisk), Person (en fisker).",
    questions: [
      { text: "å smile: ___", options: ["verb", "substantiv"], correct: "verb" },
      { text: "et smil: ___", options: ["verb", "substantiv"], correct: "substantiv" },
      { text: "Jeg ___ med mye for tiden.", options: ["arbeid", "arbeider"], correct: "arbeider" },
      { text: "Han jobber som ___.", options: ["fisk", "fisker"], correct: "fisker" }
    ]
  }
];

export default function App() {
  const [view, setView] = useState('menu'); // 'menu', 'study', 'quiz', 'summary'
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [quizState, setQuizState] = useState({
    questionIndex: 0,
    score: 0,
    answers: [],
    streak: 0,
    startTime: null,
    totalTime: 0,
    selectedOption: null,
    isAnswered: false
  });
  const [completedChapters, setCompletedChapters] = useState({});
  const [globalStats, setGlobalStats] = useState({
    totalPoints: 0,
    totalCorrect: 0,
    totalWrong: 0
  });

  const currentChapter = CHAPTERS[currentChapterIndex];

  const startQuiz = () => {
    setQuizState({
      questionIndex: 0,
      score: 0,
      answers: [],
      streak: 0,
      startTime: Date.now(),
      totalTime: 0,
      selectedOption: null,
      isAnswered: false
    });
    setView('quiz');
  };

  const handleSelectOption = (selectedOption) => {
    if (quizState.isAnswered) return;

    const question = currentChapter.questions[quizState.questionIndex];
    const isCorrect = selectedOption === question.correct;
    
    setQuizState(prev => ({
      ...prev,
      selectedOption,
      isAnswered: true,
      streak: isCorrect ? prev.streak + 1 : 0,
      score: isCorrect ? prev.score + 10 + (prev.streak * 2) : prev.score
    }));
  };

  const nextQuestion = () => {
    const question = currentChapter.questions[quizState.questionIndex];
    const isCorrect = quizState.selectedOption === question.correct;
    
    const newAnswers = [...quizState.answers, {
      question: question.text,
      selected: quizState.selectedOption,
      correct: question.correct,
      isCorrect
    }];

    if (quizState.questionIndex + 1 < currentChapter.questions.length) {
      setQuizState(prev => ({
        ...prev,
        questionIndex: prev.questionIndex + 1,
        selectedOption: null,
        isAnswered: false,
        answers: newAnswers
      }));
    } else {
      const timeTaken = Math.floor((Date.now() - quizState.startTime) / 1000);
      
      setQuizState(prev => ({
        ...prev,
        answers: newAnswers,
        totalTime: timeTaken
      }));
      
      const chapterAccuracy = Math.round((newAnswers.filter(a => a.isCorrect).length / newAnswers.length) * 100);
      setCompletedChapters(prev => ({
        ...prev,
        [currentChapter.id]: {
          score: quizState.score,
          accuracy: chapterAccuracy
        }
      }));
      
      setGlobalStats(prev => ({
        totalPoints: prev.totalPoints + quizState.score,
        totalCorrect: prev.totalCorrect + newAnswers.filter(a => a.isCorrect).length,
        totalWrong: prev.totalWrong + newAnswers.filter(a => !a.isCorrect).length
      }));

      setView('summary');
    }
  };

  const Header = () => (
    <div className="flex items-center justify-between p-4 bg-white border-b sticky top-0 z-10 shadow-sm">
      <div className="flex items-center gap-2">
        <div className="bg-blue-600 p-2 rounded-lg text-white">
          <BookOpen size={20} />
        </div>
        <h1 className="font-bold text-gray-800 hidden sm:block">Grammatikk-quiz Moldevo</h1>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1 text-orange-500 font-bold bg-orange-50 px-3 py-1 rounded-full border border-orange-100">
          <Zap size={16} fill="currentColor" />
          <span>{globalStats.totalPoints}</span>
        </div>
        <button 
          onClick={() => setView('menu')}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <Home size={20} className="text-gray-600" />
        </button>
      </div>
    </div>
  );

  const MainMenu = () => (
    <div className="max-w-4xl mx-auto p-4 animate-in fade-in duration-500">
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 text-white mb-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-3xl font-black mb-2">Velkommen, Mester!</h2>
          <p className="opacity-90 max-w-md">Klar for å knuse norsk grammatikk? Velg et tema under for å starte reisen mot A2-nivået!</p>
          <div className="mt-6 flex gap-4">
            <div className="bg-white/20 backdrop-blur-md p-3 rounded-2xl">
              <p className="text-xs uppercase opacity-70">Nøyaktighet</p>
              <p className="text-xl font-bold">
                {globalStats.totalCorrect + globalStats.totalWrong > 0 
                  ? Math.round((globalStats.totalCorrect / (globalStats.totalCorrect + globalStats.totalWrong)) * 100)
                  : 0}%
              </p>
            </div>
            <div className="bg-white/20 backdrop-blur-md p-3 rounded-2xl">
              <p className="text-xs uppercase opacity-70">Fullført</p>
              <p className="text-xl font-bold">{Object.keys(completedChapters).length} / {CHAPTERS.length}</p>
            </div>
          </div>
        </div>
        <Trophy className="absolute right-[-20px] bottom-[-20px] text-white/10 w-48 h-48" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {CHAPTERS.map((chapter, idx) => {
          const stats = completedChapters[chapter.id];
          return (
            <button
              key={chapter.id}
              onClick={() => {
                setCurrentChapterIndex(idx);
                setView('study');
              }}
              className="flex flex-col text-left p-5 rounded-2xl border-2 transition-all hover:border-blue-300 group relative bg-white shadow-sm"
              style={{ borderColor: stats ? '#10b981' : '#f3f4f6' }}
            >
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">Tema {chapter.id}</span>
                {stats && <CheckCircle2 size={18} className="text-green-500" />}
              </div>
              <h4 className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                {chapter.title}
              </h4>
              {stats && (
                <div className="mt-4 text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded inline-block">
                  FULLFØRT: {stats.accuracy}%
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );

  const StudyView = () => (
    <div className="max-w-2xl mx-auto p-4 sm:p-8 animate-in slide-in-from-right">
      <button onClick={() => setView('menu')} className="mb-6 flex items-center gap-1 text-sm text-gray-500 font-medium">
        <ChevronLeft size={16} /> Tilbake
      </button>

      <div className="bg-white rounded-3xl p-8 shadow-sm border mb-8">
        <h2 className="text-3xl font-black text-gray-800 mb-2">{currentChapter.title}</h2>
        <div className="h-1 w-20 bg-blue-600 rounded-full mb-6"></div>
        
        <div className="space-y-6">
          <div className="bg-blue-50 p-5 rounded-2xl border border-blue-100">
            <h3 className="text-xs font-bold uppercase text-blue-600 mb-2">Forklaring</h3>
            <p className="text-gray-700 leading-relaxed">{currentChapter.explanation}</p>
          </div>
          <div className="bg-orange-50 p-5 rounded-2xl border border-orange-100">
            <h3 className="text-xs font-bold uppercase text-orange-600 mb-2">Huskeregel</h3>
            <p className="text-gray-700 italic">{currentChapter.tips}</p>
          </div>
        </div>
      </div>

      <button onClick={startQuiz} className="w-full bg-blue-600 text-white font-bold py-5 rounded-2xl shadow-lg flex items-center justify-center gap-3">
        <Play size={20} fill="currentColor" /> Start Quiz
      </button>
    </div>
  );

  const QuizView = () => {
    const question = currentChapter.questions[quizState.questionIndex];
    const progress = (quizState.questionIndex / currentChapter.questions.length) * 100;

    return (
      <div className="max-w-2xl mx-auto p-4 sm:p-8 min-h-[85vh] flex flex-col">
        <div className="flex items-center gap-4 mb-8">
          <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-blue-600 transition-all duration-300" style={{ width: `${progress}%` }}></div>
          </div>
          <span className="text-xs font-bold text-gray-400 uppercase tracking-tighter">
            {quizState.questionIndex + 1} / {currentChapter.questions.length}
          </span>
        </div>

        <div className="flex-1">
          <div className="text-center py-10 px-4 bg-white rounded-3xl border shadow-sm mb-8">
            <h3 className="text-2xl font-bold text-gray-800">
              {question.text.split('___').map((part, i) => (
                <React.Fragment key={i}>
                  {part}
                  {i < question.text.split('___').length - 1 && (
                    <span className="inline-block border-b-4 border-blue-600 text-blue-600 px-3 min-w-[60px]">
                      {quizState.selectedOption || '?'}
                    </span>
                  )}
                </React.Fragment>
              ))}
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-3 max-w-sm mx-auto">
            {question.options.map((opt) => {
              let btnClass = "p-4 text-lg font-bold rounded-2xl border-2 transition-all ";
              if (!quizState.isAnswered) {
                btnClass += "bg-white border-gray-100 hover:border-blue-200 hover:bg-blue-50";
              } else {
                if (opt === question.correct) {
                  btnClass += "bg-green-100 border-green-500 text-green-700 shadow-sm";
                } else if (opt === quizState.selectedOption) {
                  btnClass += "bg-red-100 border-red-500 text-red-700";
                } else {
                  btnClass += "bg-white border-gray-100 opacity-50";
                }
              }

              return (
                <button
                  key={opt}
                  disabled={quizState.isAnswered}
                  onClick={() => handleSelectOption(opt)}
                  className={btnClass}
                >
                  <div className="flex items-center justify-between">
                    <span>{opt}</span>
                    {quizState.isAnswered && opt === question.correct && <CheckCircle2 size={20} />}
                    {quizState.isAnswered && opt === quizState.selectedOption && opt !== question.correct && <XCircle size={20} />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {quizState.isAnswered && (
          <div className="mt-8 animate-in slide-in-from-bottom flex flex-col items-center">
            <div className={`text-xl font-black uppercase mb-4 ${quizState.selectedOption === question.correct ? 'text-green-600' : 'text-red-600'}`}>
              {quizState.selectedOption === question.correct ? 'Riktig!' : 'Feil!'}
            </div>
            <button
              onClick={nextQuestion}
              className="w-full max-w-sm bg-gray-800 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-black transition-colors"
            >
              Neste oppgave <ArrowRight size={20} />
            </button>
          </div>
        )}
      </div>
    );
  };

  const SummaryView = () => {
    const correctCount = quizState.answers.filter(a => a.isCorrect).length;
    const accuracy = Math.round((correctCount / quizState.answers.length) * 100);

    return (
      <div className="max-w-2xl mx-auto p-4 sm:p-8 animate-in zoom-in-95 duration-500">
        <div className="text-center mb-10">
          <div className="inline-block p-4 bg-yellow-100 text-yellow-600 rounded-3xl mb-4 shadow-sm">
            <Award size={64} />
          </div>
          <h2 className="text-4xl font-black text-gray-800 tracking-tighter uppercase">Oppgave ferdig!</h2>
          <p className="text-gray-500">Du fullførte temaet <span className="text-blue-600 font-bold">{currentChapter.title}</span></p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
          <div className="bg-white p-5 rounded-2xl border text-center">
            <p className="text-[10px] font-bold text-gray-400 uppercase">Poeng</p>
            <p className="text-2xl font-black text-blue-600">{quizState.score}</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border text-center">
            <p className="text-[10px] font-bold text-gray-400 uppercase">Riktige</p>
            <p className="text-2xl font-black text-green-500">{correctCount}</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border text-center">
            <p className="text-[10px] font-bold text-gray-400 uppercase">Nøyaktighet</p>
            <p className="text-2xl font-black text-orange-500">{accuracy}%</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border text-center">
            <p className="text-[10px] font-bold text-gray-400 uppercase">Sluttid</p>
            <p className="text-2xl font-black text-gray-800">{quizState.totalTime}s</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl border shadow-sm overflow-hidden mb-8">
          <div className="bg-gray-50 p-4 border-b">
            <h3 className="font-bold text-gray-800 flex items-center gap-2">
              <RefreshCw size={18} /> Scoreboard Gjennomgang
            </h3>
          </div>
          <div className="divide-y max-h-80 overflow-y-auto">
            {quizState.answers.map((ans, i) => (
              <div key={i} className="p-4 flex items-start gap-4 hover:bg-gray-50 transition-colors">
                <div className={`mt-1 p-1 rounded-full ${ans.isCorrect ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                  {ans.isCorrect ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-700 leading-tight">{ans.question}</p>
                  <div className="mt-2 flex gap-4 text-xs">
                    <span className="text-gray-500">Ditt svar: <b className={ans.isCorrect ? 'text-green-600' : 'text-red-600'}>{ans.selected}</b></span>
                    {!ans.isCorrect && <span className="text-gray-500">Riktig: <b className="text-green-600">{ans.correct}</b></span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-4">
          <button onClick={() => setView('menu')} className="flex-1 bg-gray-100 py-4 rounded-2xl font-bold text-gray-600 hover:bg-gray-200 transition-all">
            Hjem
          </button>
          {currentChapterIndex < CHAPTERS.length - 1 && (
            <button 
              onClick={() => {
                setCurrentChapterIndex(prev => prev + 1);
                setView('study');
              }} 
              className="flex-[2] bg-blue-600 py-4 rounded-2xl font-bold text-white shadow-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
            >
              Neste tema <ArrowRight size={20} />
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-gray-900 selection:bg-blue-100">
      <Header />
      <main className="pb-20">
        {view === 'menu' && <MainMenu />}
        {view === 'study' && <StudyView />}
        {view === 'quiz' && <QuizView />}
        {view === 'summary' && <SummaryView />}
      </main>

      {view === 'menu' && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white px-6 py-3 rounded-full border shadow-xl flex items-center gap-4 z-20">
          <div className="flex items-center gap-1 text-orange-500">
            <Zap size={18} fill="currentColor" />
            <span className="font-bold">{globalStats.totalPoints}</span>
          </div>
          <div className="h-4 w-[1px] bg-gray-200"></div>
          <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">
            {Object.keys(completedChapters).length} / {CHAPTERS.length} Fullført
          </div>
        </div>
      )}
    </div>
  );
}
