from django.core.management.base import BaseCommand
from store.models import Product


class Command(BaseCommand):
    help = 'Seed the database with iconic retro gaming consoles.'

    def handle(self, *args, **options):
        consoles = [
            {
                'name': 'Nintendo Entertainment System',
                'brand': 'Nintendo',
                'release_year': 1983,
                'price': 99.99,
                'image': '/static/images/nes.png',
                'description': 'The NES is an 8-bit third-generation home video game console.',
                'platform': 'NES',
                'rating': 4.8,
            },
            {
                'name': 'Super Nintendo Entertainment System',
                'brand': 'Nintendo',
                'release_year': 1990,
                'price': 119.99,
                'image': '/static/images/snes.png',
                'description': 'The SNES is a 16-bit home video game console.',
                'platform': 'SNES',
                'rating': 4.9,
            },
            {
                'name': 'Sega Genesis',
                'brand': 'Sega',
                'release_year': 1988,
                'price': 89.99,
                'image': '/static/images/genesis.png',
                'description': 'The Genesis is a 16-bit fourth-generation home video game console.',
                'platform': 'Genesis',
                'rating': 4.7,
            },
            {
                'name': 'Sony PlayStation',
                'brand': 'Sony',
                'release_year': 1994,
                'price': 129.99,
                'image': 'https://picsum.photos/300/200?random=4',
                'description': 'The PlayStation is a fifth-generation home video game console.',
                'platform': 'PlayStation',
                'rating': 4.8,
            },
            {
                'name': 'Nintendo 64',
                'brand': 'Nintendo',
                'release_year': 1996,
                'price': 149.99,
                'image': 'https://picsum.photos/300/200?random=5',
                'description': 'The N64 is a 64-bit home video game console.',
                'platform': 'N64',
                'rating': 4.6,
            },
            {
                'name': 'Atari 2600',
                'brand': 'Atari',
                'release_year': 1977,
                'price': 79.99,
                'image': 'https://picsum.photos/300/200?random=6',
                'description': 'The Atari 2600 is a second-generation home video game console.',
                'platform': 'Atari',
                'rating': 4.5,
            },
            {
                'name': 'Sega Dreamcast',
                'brand': 'Sega',
                'release_year': 1998,
                'price': 99.99,
                'image': 'https://picsum.photos/300/200?random=7',
                'description': 'The Dreamcast is a sixth-generation home video game console.',
                'platform': 'Dreamcast',
                'rating': 4.4,
            },
            {
                'name': 'Sony PlayStation 2',
                'brand': 'Sony',
                'release_year': 2000,
                'price': 149.99,
                'image': '/static/ps2.png',
                'description': 'The PlayStation 2 is the best-selling video game console of all time.',
                'platform': 'PlayStation 2',
                'rating': 4.9,
            },
            {
                'name': 'Game Boy',
                'brand': 'Nintendo',
                'release_year': 1989,
                'price': 69.99,
                'image': 'https://picsum.photos/300/200?random=9',
                'description': 'The Game Boy is an 8-bit handheld game console.',
                'platform': 'Game Boy',
                'rating': 4.7,
            },
            {
                'name': 'Sega Saturn',
                'brand': 'Sega',
                'release_year': 1994,
                'price': 139.99,
                'image': 'https://picsum.photos/300/200?random=10',
                'description': 'The Saturn is a 32-bit fifth-generation home video game console.',
                'platform': 'Saturn',
                'rating': 4.3,
            },
        ]

        for console_data in consoles:
            product, created = Product.objects.get_or_create(
                name=console_data['name'],
                defaults=console_data
            )
            if created:
                self.stdout.write(
                    self.style.SUCCESS(f'Successfully created product "{console_data["name"]}"')
                )
            else:
                # Update existing product with new image
                product.image = console_data['image']
                product.save()
                self.stdout.write(
                    self.style.WARNING(f'Updated product "{console_data["name"]}" with new image')
                )

        self.stdout.write(
            self.style.SUCCESS(f'Successfully seeded {len(consoles)} retro gaming consoles!')
        ) 