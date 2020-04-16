// import { AbstractCompetitionDAO } from '../AbstractCompetitionDAO';
// import { Tournament } from '@/model/Tournament'
// import { ICompetitionFilter } from '@/model/ICompetitionFilter';
// import { Db } from '@/firebase/Db';
// import { Bot } from '@/model/Bot';
// import { assignDefined } from '@/Utils/assignDefined'
// import { botConverter } from './FirebaseBotDao'

// export const competitionConverter = {
//     toFirestore(competition: Tournament): firebase.firestore.DocumentData {
//         const data = assignDefined({}, competition);
//         return data;
//     },
//     fromFirestore(
//         snapshot: firebase.firestore.QueryDocumentSnapshot,
//         options: firebase.firestore.SnapshotOptions
//     ): Tournament {
//         const data = snapshot.data(options)!;
//         return new Tournament([], data.name, data.type, data.rounds, 
//                                 data.rankings, data.status, data.startingDate, 
//                                 data.startedAt, data.finishedAt, snapshot.id);
//     }
// }

// export class FirebaseCompetitionDAO extends AbstractCompetitionDAO {

//     async join(competitionId: string, bot: Bot): Promise<void> {
//         await Db.collection('competitions').doc(competitionId).collection('participants').doc(bot.id).set(bot)
//     }

//     async withdraw(competitionId: string, botId: string): Promise<void> {
//         await Db.collection('competitions').doc(competitionId).collection('participants').doc(botId).delete();
//     }

//     async findOne(id: string): Promise<Tournament> {
//         const snapshot = await Db.collection('competitions')
//                                     .withConverter(competitionConverter)
//                                     .doc(id)
//                                     .get();

//         const competition = snapshot.data();
//         if(competition) {
//             competition.participants = await this.getParticipantsFromCompetition(id);
//             return competition;
//         }
//         else {
//             throw new Error("Competition not found in DB");
//         }
//     }   

//     async find(filter?: ICompetitionFilter | undefined, startAt?: number | undefined, endAt?: number | undefined): Promise<Tournament[]> {
//         const snapshots = await Db.collection('competitions')
//                                   .withConverter(competitionConverter)
//                                   .get();

//         const competitions = [] as Tournament[];
//         snapshots.docs.forEach(async value => {
//             const competition = value.data();
//             competition.participants = await this.getParticipantsFromCompetition(competition.id);
//             competitions.push(competition);
//         });

//         return competitions;
//     }

//     async create(competition: Tournament): Promise<string> {
//         const result = await Db.collection('competitions')
//                                .withConverter(competitionConverter)
//                                .add(competition);
//         return result.id;
//     }

//     update(competition: Tournament): Promise<void> {
//         throw new Error("Method not implemented.");
//     }

//     delete(id: string): Promise<void> {
//         throw new Error("Method not implemented.");
//     }
    
//     // Helpers

//     async getParticipantsFromCompetition(competitionId: string): Promise<Bot[]> {
//         const participantsSnapshot = await Db.collection('competitions')
//                                               .doc(competitionId)
//                                               .collection('participants')
//                                               .withConverter(botConverter)
//                                               .get();

//         const participants = participantsSnapshot.docs.map( botSnap => {
//             return botSnap.data()
//         });

//         return participants;
//     }
// }