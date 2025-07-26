from django.core.management.base import BaseCommand
from store.models import Product


class Command(BaseCommand):
    help = 'Fix image paths for the first 4 products to use local PNG images'

    def handle(self, *args, **options):
        # Update the first 4 products with correct PNG paths
        updates = {
            'Nintendo Entertainment System': '/static/nes.png',
            'Super Nintendo Entertainment System': '/static/snes.png',
            'Sega Genesis': '/static/genesis.png',
            'Sony PlayStation 2': '/static/ps2.png',
        }

        for name, image_path in updates.items():
            try:
                product = Product.objects.get(name=name)
                product.image = image_path
                product.save()
                self.stdout.write(
                    self.style.SUCCESS(f'✅ Updated {name} with image: {image_path}')
                )
            except Product.DoesNotExist:
                self.stdout.write(
                    self.style.ERROR(f'❌ Product {name} not found')
                )

        self.stdout.write(
            self.style.SUCCESS('🎮 Image paths updated successfully!')
        ) 