import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  // Create genres
  const fiction = await prisma.genre.create({
    data: {
      name: 'Fiction',
    },
  });

  const science = await prisma.genre.create({
    data: {
      name: 'Science',
    },
  });

  const history = await prisma.genre.create({
    data: {
      name: 'History',
    },
  });

  const technology = await prisma.genre.create({
    data: {
      name: 'Technology',
    },
  });


  // Create books
  await prisma.book.createMany({
    data: [
      {
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        isbn: '9780743273565',
        genreId: fiction.id,
      },
      {
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        isbn: '9780061120084',
        genreId: fiction.id,
      },
      {
        title: '1984',
        author: 'George Orwell',
        isbn: '9780451524935',
        genreId: fiction.id,
      },
      {
        title: 'The Hobbit',
        author: 'J.R.R. Tolkien',
        isbn: '9780547928227',
        genreId: fiction.id,
      },

      {
        title: 'A Brief History of Time',
        author: 'Stephen Hawking',
        isbn: '9780553380163',
        genreId: science.id,
      },
      {
        title: 'Cosmos',
        author: 'Carl Sagan',
        isbn: '9780345539434',
        genreId: science.id,
      },
      {
        title: 'The Selfish Gene',
        author: 'Richard Dawkins',
        isbn: '9780198788607',
        genreId: science.id,
      },

      {
        title: 'Sapiens',
        author: 'Yuval Noah Harari',
        isbn: '9780062316097',
        genreId: history.id,
      },
      {
        title: 'Guns, Germs, and Steel',
        author: 'Jared Diamond',
        isbn: '9780393354324',
        genreId: history.id,
      },
      {
        title: 'The Silk Roads',
        author: 'Peter Frankopan',
        isbn: '9781408839997',
        genreId: history.id,
      },

      {
        title: 'Clean Code',
        author: 'Robert C. Martin',
        isbn: '9780132350884',
        genreId: technology.id,
      },
      {
        title: 'The Pragmatic Programmer',
        author: 'Andrew Hunt',
        isbn: '9780135957059',
        genreId: technology.id,
      },
      {
        title: 'Design Patterns',
        author: 'Erich Gamma',
        isbn: '9780201633610',
        genreId: technology.id,
      },
      {
        title: 'Introduction to Algorithms',
        author: 'Thomas Cormen',
        isbn: '9780262033848',
        genreId: technology.id,
      },
      {
        title: 'Computer Networks',
        author: 'Andrew Tanenbaum',
        isbn: '9780132126953',
        genreId: technology.id,
      },
    ],
  });

  console.log('Database seeded successfully!');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });