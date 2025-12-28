import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Seeding achievements...');

    const achievements = [
        {
            name: '7-Day Streak',
            description: 'Maintained a generic study streak for 7 consecutive days.',
            icon: '🔥',
            xpValue: 500,
            condition: 'STREAK_7',
        },
        {
            name: 'Perfect Score',
            description: 'Achieved 100% on a quiz.',
            icon: '💯',
            xpValue: 200,
            condition: 'PERFECT_SCORE',
        },
        {
            name: 'Night Owl',
            description: 'Completed a learning session after 10 PM.',
            icon: '🦉',
            xpValue: 100,
            condition: 'NIGHT_OWL',
        },
        {
            name: 'Early Bird',
            description: 'Completed a learning session before 7 AM.',
            icon: '🌅',
            xpValue: 100,
            condition: 'EARLY_BIRD',
        },
        {
            name: 'Quiz Master',
            description: 'Completed 10 quizzes.',
            icon: '🧠',
            xpValue: 1000,
            condition: 'QUIZ_MASTER_10',
        }
    ];

    for (const achievement of achievements) {
        await prisma.achievement.upsert({
            where: { name: achievement.name },
            update: {},
            create: achievement,
        });
        console.log(`Upserted achievement: ${achievement.name}`);
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
