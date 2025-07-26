#!/usr/bin/env python
import os
import django

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'retrostore.settings')
django.setup()

from store.models import Product

# Update images with working placeholder URLs
image_updates = {
    'Nintendo Entertainment System': '/static/images/nes.png',
    'Super Nintendo Entertainment System': '/static/images/snes.png',
    'Sega Genesis': '/static/images/genesis.png',
    'Sony PlayStation': 'https://picsum.photos/300/200?random=4',
    'Nintendo 64': 'https://picsum.photos/300/200?random=5',
    'Atari 2600': 'https://picsum.photos/300/200?random=6',
    'Sega Dreamcast': 'https://picsum.photos/300/200?random=7',
    'Sony PlayStation 2': 'https://picsum.photos/300/200?random=8',
    'Game Boy': 'https://picsum.photos/300/200?random=9',
    'Sega Saturn': 'https://picsum.photos/300/200?random=10',
}

for name, image_url in image_updates.items():
    try:
        product = Product.objects.get(name=name)
        product.image = image_url
        product.save()
        print(f"Updated {name} with new image")
    except Product.DoesNotExist:
        print(f"Product {name} not found")

print("Image update complete!") 