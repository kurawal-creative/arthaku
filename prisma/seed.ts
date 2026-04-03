import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { auth } from '../src/lib/auth';

const prisma = new PrismaClient();

const ADMIN_NAME = 'Admin';
const ADMIN_EMAIL = 'admin@gmail.com';
const ADMIN_PASSWORD = '12345678';

export async function main() {
    console.log('Start seeding admin...');

    const existingAdmin = await prisma.user.findFirst({
        where: { email: ADMIN_EMAIL },
    });

    if (existingAdmin) {
        console.log(`Admin ${ADMIN_EMAIL} already exists, skipping...`);
        return;
    }

    let result;
    try {
        result = await auth.api.signUpEmail({
            body: {
                name: ADMIN_NAME,
                email: ADMIN_EMAIL,
                password: ADMIN_PASSWORD,
            },
        });
    } catch (error) {
        if (typeof error === 'object' && error !== null && 'body' in error && typeof (error as { body?: { code?: string } }).body?.code === 'string' && (error as { body?: { code?: string } }).body?.code === 'USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL') {
            console.log(`Admin ${ADMIN_EMAIL} already exists, skipping...`);
            return;
        }

        throw error;
    }

    if (!result?.user?.id) {
        throw new Error('Failed to seed admin account.');
    }

    console.log(`Created admin user: ${result.user.email}`);

    console.log('Seeding finished.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
