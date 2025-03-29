#!/bin/bash

# Create directory for images if it doesn't exist
mkdir -p src/assets/images

# Main placeholder images
echo "Creating main placeholder images..."
wget -O src/assets/images/logo.png "https://placehold.co/200x60/023f88/ffffff?text=CISCON"
wget -O src/assets/images/logo-white.png "https://placehold.co/200x60/ffffff/023f88?text=CISCON"
wget -O src/assets/images/hero-image.jpg "https://picsum.photos/1200/800"
wget -O src/assets/images/about-image.jpg "https://picsum.photos/600/400"
wget -O src/assets/images/video-thumbnail.jpg "https://picsum.photos/800/450"

# Home page images
echo "Creating home page images..."
wget -O src/assets/images/about-story.jpg "https://picsum.photos/600/400?random=1"
wget -O src/assets/images/about-hero.jpg "https://picsum.photos/1200/400?random=2"
wget -O src/assets/images/services-hero.jpg "https://picsum.photos/1200/400?random=3"
wget -O src/assets/images/projects-hero.jpg "https://picsum.photos/1200/400?random=4"
wget -O src/assets/images/contact-hero.jpg "https://picsum.photos/1200/400?random=5"

# Service images
echo "Creating service images..."
wget -O src/assets/images/geological-services.jpg "https://picsum.photos/600/400?random=10"
wget -O src/assets/images/engineering-services.jpg "https://picsum.photos/600/400?random=11"
wget -O src/assets/images/training-services.jpg "https://picsum.photos/600/400?random=12"
wget -O src/assets/images/consulting-services.jpg "https://picsum.photos/600/400?random=13"
wget -O src/assets/images/safety-equipment.jpg "https://picsum.photos/600/400?random=14"
wget -O src/assets/images/technical-support.jpg "https://picsum.photos/600/400?random=15"

# Service detail images
echo "Creating service detail images..."
wget -O src/assets/images/well-site-geology.jpg "https://picsum.photos/600/400?random=20"
wget -O src/assets/images/mud-logging.jpg "https://picsum.photos/600/400?random=21"
wget -O src/assets/images/geological-consulting.jpg "https://picsum.photos/600/400?random=22"
wget -O src/assets/images/reservoir-characterization.jpg "https://picsum.photos/600/400?random=23"
wget -O src/assets/images/geological-mapping.jpg "https://picsum.photos/600/400?random=24"
wget -O src/assets/images/geological-services-hero.jpg "https://picsum.photos/1200/400?random=25"

# Project images
echo "Creating project images..."
wget -O src/assets/images/project-1.jpg "https://picsum.photos/600/400?random=30"
wget -O src/assets/images/project-2.jpg "https://picsum.photos/600/400?random=31"
wget -O src/assets/images/project-3.jpg "https://picsum.photos/600/400?random=32"
wget -O src/assets/images/project-4.jpg "https://picsum.photos/600/400?random=33"
wget -O src/assets/images/project-5.jpg "https://picsum.photos/600/400?random=34"
wget -O src/assets/images/project-6.jpg "https://picsum.photos/600/400?random=35"
wget -O src/assets/images/project-7.jpg "https://picsum.photos/600/400?random=36"
wget -O src/assets/images/project-8.jpg "https://picsum.photos/600/400?random=37"
wget -O src/assets/images/project-9.jpg "https://picsum.photos/600/400?random=38"
wget -O src/assets/images/featured-project.jpg "https://picsum.photos/800/600?random=39"

# Case study images
echo "Creating case study images..."
wget -O src/assets/images/case-study-1.jpg "https://picsum.photos/600/400?random=40"
wget -O src/assets/images/case-study-2.jpg "https://picsum.photos/600/400?random=41"
wget -O src/assets/images/case-study-3.jpg "https://picsum.photos/600/400?random=42"

# Team images
echo "Creating team images..."
wget -O src/assets/images/team-1.jpg "https://picsum.photos/300/300?random=50"
wget -O src/assets/images/team-2.jpg "https://picsum.photos/300/300?random=51"
wget -O src/assets/images/team-3.jpg "https://picsum.photos/300/300?random=52"
wget -O src/assets/images/team-4.jpg "https://picsum.photos/300/300?random=53"

# Testimonial images
echo "Creating testimonial images..."
wget -O src/assets/images/testimonial-1.jpg "https://picsum.photos/100/100?random=60"
wget -O src/assets/images/testimonial-2.jpg "https://picsum.photos/100/100?random=61"
wget -O src/assets/images/testimonial-3.jpg "https://picsum.photos/100/100?random=62"

# Partner logos
echo "Creating partner logo images..."
wget -O src/assets/images/partner-1.png "https://placehold.co/200x100/ffffff/333333?text=Partner+1"
wget -O src/assets/images/partner-2.png "https://placehold.co/200x100/ffffff/333333?text=Partner+2"
wget -O src/assets/images/partner-3.png "https://placehold.co/200x100/ffffff/333333?text=Partner+3"
wget -O src/assets/images/partner-4.png "https://placehold.co/200x100/ffffff/333333?text=Partner+4"
wget -O src/assets/images/partner-5.png "https://placehold.co/200x100/ffffff/333333?text=Partner+5"
wget -O src/assets/images/partner-6.png "https://placehold.co/200x100/ffffff/333333?text=Partner+6"

# Certification images
echo "Creating certification images..."
wget -O src/assets/images/iso-certification.png "https://placehold.co/300x200/ffffff/333333?text=ISO+9001"
wget -O src/assets/images/dpr-certification.png "https://placehold.co/300x200/ffffff/333333?text=DPR+Certification"
wget -O src/assets/images/soncap-certification.png "https://placehold.co/300x200/ffffff/333333?text=SON+Certification"

echo "All placeholder images created successfully!"