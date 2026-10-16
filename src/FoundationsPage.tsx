import { useState } from "react";

const pastTeams = [
  { batch: "2017-2021", members: ["Kunal Kapoor"] },
  { batch: "2018-2022", members: ["Shubham Shukla"] },
  { batch: "2019-2023", members: ["Riya", "Sagar Verma", "Suryansh Mishra"] },
  { batch: "2020-2024", members: ["Sukriti Gupta", "Drishti Dhall", "Abhinav Tyagi"] },
  {
    batch: "2021-2025",
    members: [
      "Radhika Gupta",
      "Jhalak Bansal",
      "Khushbu Kashyap",
      "Prerna Chauhan",
      "Srishti",
      "Vineet Kumar Singh",
      "Abhishek Chaudhary",
      "Mohd. Arham",
    ],
  },
  {
    batch: "2022-26",
    members: [
      "Atharv Gupta",
      "Rajshree Mishra",
      "Abhishek Kumar Singh",
      "Vashika Tyagi",
      "Janvi Chauhan",
      "Ujjwal Kumar",
      "Kavita Kumari",
      "Saniya",
      "Sunidhi",
    ],
  },
];

const foundationPhotos: Record<string, string> = {
  "Kunal Kapoor": "/Foundations/kunal-kapoor-2017-21.jpg",
  "Shubham Shukla": "/Foundations/shubham-shukla-2018-22.jpg",
  Riya: "/Foundations/riya-2019-23.jpeg",
  "Sagar Verma": "/Foundations/sagar-2019-23.jpeg",
  "Suryansh Mishra": "/Foundations/suryansh-2019-23.jpeg",
  "Sukriti Gupta": "/Foundations/sukriti%2020-24.jpeg",
  "Drishti Dhall": "/Foundations/drishti-2020-24.jpeg",
  "Abhinav Tyagi": "/Foundations/abhinav-2020-24.jpeg",
  "Radhika Gupta": "/Foundations/radhika-2021-25.jpeg",
  "Jhalak Bansal": "/Foundations/jhalak-2021-25.jpeg",
  "Khushbu Kashyap": "/Foundations/khushbu-2021-25.jpeg",
  "Prerna Chauhan": "/Foundations/prerna-2021-25.jpeg",
  Srishti: "/Foundations/srishti-2021-25.jpeg",
  "Vineet Kumar Singh": "/Foundations/vineet-2021-25.jpeg",
  "Abhishek Chaudhary": "/Foundations/abhishek-2021-25.jpeg",
  "Mohd. Arham": "/Foundations/arham-2021-25.jpeg",
  "Atharv Gupta": "/Foundations/atharv-2022-26.jpg",
  "Rajshree Mishra": "/Foundations/rajshree-2022-26.jpg",
  "Abhishek Kumar Singh": "/Foundations/abhishek-2022-26.jpg",
  "Vashika Tyagi": "/Foundations/vashika-2022-26.jpg",
  "Janvi Chauhan": "/Foundations/janvi-2022-26.jpg",
  "Ujjwal Kumar": "/Foundations/ujjwal-2022-26.jpg",
  "Kavita Kumari": "/Foundations/kavita-2022-26.jpg",
  Saniya: "/Foundations/Saniya-2022-26.jpg",
  Sunidhi: "/Foundations/sunidhi-2022-26.jpg",
};

export default function FoundationsPage() {
  const [selectedTeam, setSelectedTeam] = useState(0);
  const activeTeam = pastTeams[selectedTeam];

  return (
    <div className="container showcase-container foundations-container">
      <header>
        <div className="nav">
          <a className="brand" href="/" aria-label="The Land of Art home">
            <img src="/LOA%20logo.png" alt="" className="logo" />
            <span>The Land of Art</span>
          </a>
          <nav aria-label="Foundations navigation">
            <a href="/#home">Home</a>
            <a href="/showcase">Events Gallery</a>
          </nav>
        </div>
      </header>
      <main className="showcase-main foundations-main">
        <section className="showcase-hero foundations-hero">
          <div className="eyebrow">Pillars of LOA</div>
          <h1>THE VISIONARY CREW OF THE LAND OF ART</h1>
          <p className="lead">The creative spirits shaping the Land of Art’s story.</p>
        </section>
        <section className="past-teams-section" aria-labelledby="past-teams-title">
          <h2 id="past-teams-title">Previous Batches</h2>
          <div className="past-team-selector" role="group" aria-label="Choose a past team batch">
            {pastTeams.map((team, index) => (
              <button
                className={`past-team-button${selectedTeam === index ? " is-selected" : ""}`}
                type="button"
                aria-pressed={selectedTeam === index}
                key={team.batch}
                onClick={() => setSelectedTeam(index)}
              >
                {team.batch}
              </button>
            ))}
          </div>
          <div className="past-team-members" aria-label={`${activeTeam.batch} team members`}>
            {activeTeam.members.map((memberName) => {
              const memberPhoto = foundationPhotos[memberName];
              const memberMark = memberName
                .split(/\s+/)
                .map((part) => part.replace(/\W/g, "").charAt(0))
                .join("")
                .slice(0, 3)
                .toUpperCase();

              return (
                <article className="past-team-member" key={`${activeTeam.batch}-${memberName}`}>
                  {memberPhoto ? (
                    <div className="past-team-member-photo">
                      <img src={memberPhoto} alt={memberName} loading="lazy" />
                    </div>
                  ) : (
                    <div className="past-team-member-photo" role="img" aria-label={`Portrait placeholder for ${memberName}`}>
                      <span>{memberMark}</span>
                      <small>Photo to be added</small>
                    </div>
                  )}
                  <h3>{memberName}</h3>
                </article>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
