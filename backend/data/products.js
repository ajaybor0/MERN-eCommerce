const products = [
  {
    name: 'ASUS [SmartChoice] TUF Gaming Laptop F15, Intel Core i5-11400H 11th Gen, 15.6" (39.62 cm) FHD 144Hz, (16GB/512GB SSD/4GB NVIDIA GeForce RTX 2050/Win 11/ RGB Backlit KB/Black/2.30 kg), FX506HF-HN025W',
    image: '/uploads/71-Fx3Vfq5L._SL1500_.jpg',
    description:
      'Processor: Intel Core i5-11400H Processor 2.7 GHz (12M Cache, up to 4.5 GHz, 6 Cores) Play over 100 high-quality PC games, plus new and upcoming blockbusters on day one like Halo Infinite, Forza Horizon 5, and Age of Empires IV and one month of Game Pass-including EA Play With new games added. Age of Empires IV, Back 4 Blood, Battlefield V, Forza Horizon 5, Halo Infinite*, Knockout City, Microsoft Flight Simulator, Minecraft PC Bundle, Need for Speed Heat, Psychonauts2, The Sims 4, Titanfall 2, 12 Minutes Memory: 16GB SO-DIMM DDR4 3200MHz Support Up to 32GB 2x SO-DIMM slots | Storage: 512GB PCIe 3.0 NVMe M.2 SSD with additional 1x M.2 Slot for SSD Storage expansion Display: 15.6 inch (39.62 cms) FHD (1920 x 1080) 16:9 250nits, 144Hz Refresh Rate, vIPS-level Anti-glare display, Contrast Ratio: 1000:1 with Adaptive-Sync Operating System: Windows 11 Homewith Lifetime Validity Design: 2.28 ~ 2.45 cm Thin | 48WHrs, 4S1P, 4-cell Li-ion | Up to 6 hours battery life; Note: Battery life depends on conditions of usage I/O Port: 1x RJ45 LAN port, 1x Thunderbolt 4 support, DisplayPort, 3x USB 3.2 Gen 1 Type-A ',
    brand: 'ASUS',
    category: 'Electronics',
    price: 57990,
    countInStock: 10,
    rating: 4.5,
    numReviews: 12
  },
  {
    name: 'Acer Nitro V Gaming Laptop 13th Gen Intel Core i5-13420H with RTX 4050 Graphics 6GB VRAM, 144Hz Display (16GB DDR5/512GB SSD/Windows 11 Home/Wi-Fi 6),15.6"(39.6cms) FHD ANV15-51',
    image: '/uploads/51TiJ0A-KsL._SL1000_.jpg',
    description:
      'Processor: Intel Core i5-13420H processor - 8 cores, max turbo up to 4.60 Ghz | RAM : 16 GB of DDR5 system memory, upgradable to 32 GB (Memory Frequency: Up to 5200 MT/s) Display : 15.6" display with IPS (In-Plane Switching) technology, Full HD 1920 x 1080, Acer ComfyView LED-backlit TFT LCD, 16:9 aspect ratio, supporting 144 Hz refresh rate Graphics : NVIDIA GeForce RTX 4050 with 6 GB of dedicated GDDR6 Storage : 512 GB SSD, PCIe Gen4, 16 Gb/s, NVMe (Upgradable Upto 2*1 TB SSD) | OS : Windows 11 Home 64-bit Ports: 1 x USB 3.2 Gen 1 port with power-off charging, 1 x USB 3.2 Gen 1 port, 1 x USB Type-C port (Thunderbolt ) | Features: Backlit keyboard',
    brand: 'ACER',
    category: 'Electronics',
    price: 79990,
    countInStock: 7,
    rating: 4.0,
    numReviews: 8
  },
  {
    name: 'HP Victus Gaming Laptop,12th Gen Intel Core i5-12450H,NVIDIA RTX 3050 GPU,15.6-inch (39.6 cm),FHD,IPS,144Hz,Windows 11 Home,9 ms Response time,16GB DDR4,512GB SSD,Backlit KB(MSO,Blue,2.29 kg) fa0666TX',
    image: '/uploads/71h9nOTd93L._SL1500_.jpg',
    description:
      '8-core 12th Gen Intel Core i5-12450H】12 threads and 12MB L3 cache enable you to dominate virtual battles and juggle multiple tasks without overheating, all with updated thermals.【NVIDIA GeForce RTX 3050 Laptop GPU】Experience immersive, lifelike gameplay with stunning graphics and accelerate heavy workflows with high-speed data processing, video editing, and rendering.【Upgraded memory and storage】Make room for all your games with 512GB PCIe Gen4 NVMe TLC M.2 SSD. Plus, get 16GB DDR4 RAM that lets you take on any opponent with improved system responsiveness.【Popular games】Play all your favourite games like League of Legends, Valorant, Fortnite, Call of Duty: Warzone, Apex Legends, Overwatch 2, Fall Guys, and more.【Micro-edge display】The 15.6-inch, FHD, 250-nit, 144Hz, anti-glare, and micro-edge display keeps you in the thick of action with a fast 9 ms response time, reduced image ghosting, and crisp visuals.',
    brand: 'HP',
    category: 'Electronics',
    price: 71990,
    countInStock: 5,
    rating: 4.2,
    numReviews: 12
  },
  {
    name: 'ASUS ROG Strix G17 (2022), 17.3-inch (43.94 cms) FHD 144Hz, AMD Ryzen 7-6800HS, RTX 3050 4GB Graphics, Gaming Laptop (16GB/512GB SSD/Windows 11/Gray/2.5 Kg),G713RC-HX109WS',
    image: '/uploads/61GkvvDNnCL._SL1500_.jpg',
    description:
      'Processor: AMD Ryzen 7 6800HS Mobile Processor (8-core/16-thread, 20MB cache, up to 4.7 GHz max boost) Play over 100 high-quality PC games, plus new and upcoming blockbusters on day one like Halo Infinite, Forza Horizon 5, and Age of Empires IV and 1 month of Game Pass-including EA Play With new games added. Age of Empires IV, Back 4 Blood, Battlefield V, Forza Horizon 5, Halo Infinite*, Knockout City, Microsoft Flight Simulator, Minecraft PC Bundle, Need for Speed Heat, Psychonauts2, The Sims 4, Titanfall 2, 12 Minutes Memory: 16GB (8GB SO-DIMM *2) DDR5 4800MHz Upgradeble Up to 32GB using 2x SO-DIMM Slot | Storage: 512GB PCIe 4.0 NVMe M.2 SSD with empty additional 2x M.2 Slot for SSD Storage Display: 17.3-inch (43.94 cm) FHD (1920 x 1080) 16:9 250nits, 144 Hz Refresh Rate, vIPS-level Anti-glare display, with Adaptive-Sync Graphics: Dedicated NVIDIA GeForce RTX 3050 4GB GDDR6 VRAM with ROG Boost: 1550MHz* at 95W (1500MHz Boost Clock+50MHz OC, 80W+15W Dynamic Boost) Operating System: Pre-installed Windows 11 Home with Lifetime Validity | Software Included: Pre-installed Office Home and Student with Lifetime Validity | McAfee (1 Year) Keyboard: Backlit Chiclet Keyboard 4-Zone RGB I/O port: 1x 3.5mm Combo Audio Jack, 1x HDMI 2.0b, 1x 2.5G LAN port, 1x USB 3.2 Gen 2 Type-C, 1x USB 3.2 Gen 2 Type-C support DisplayPort / power delivery / G-SYNC, 2x USB 3.2 Gen 1 Type-A',
    brand: 'ASUS',
    category: 'Electronics',
    price: 94990,
    countInStock: 11,
    rating: 3.7,
    numReviews: 12
  },
  {
    name: 'MSI Sword 15 A12VF, Intel 12th Gen. i7-12650H, 40CM FHD 144Hz Gaming Laptop (8GBx2/1TB NVMe SSD/Windows 11 Home/Nvidia GeForce RTX4060, 8GB GDDR6/White/2.25Kg), A12VF-401IN',
    image: '/uploads/71cRA3lD-8L._SL1500_.jpg',
    description:
      'Processor: 12th Generation Intel Core i7-12650H Up To 4.70GHz Operating System: Pre-loaded Windows 11 Home with lifetime validity |Preinstalled Software: MSI Center | In the box: Laptop, Power Adapter Display: 40CM FHD (1920x1080), 144Hz, 45% NTSC, IPS-Level Panel Memory & Storage: 8GBx2 DDR5 Dual Channel RAM | Storage: 1TB NVMe PCIe Gen4x4 SSD "NVIDIA GeForce RTX 4060, GDDR6 8GB | Gb LAN 802.11 ax Wi-Fi 6 + Bluetooth v5.2" Gaming Laptop | Laptop weight: 2.25kg Keyboard: Single Backlit Keyboard (Blue) Camera: HD type (30fps@720p) | Microphone: Built-in microphone "1x Type-C (USB3.2 Gen1 / DP) 2x Type-A USB3.2 Gen1 1x Type-A USB2.0 1x HDMI 2.1 (8K @ 60Hz / 4K @ 120Hz) 1x RJ45" This genuine MSI laptop comes with 2 year Carry-in & On-site warranty from MSI covering manufacturing defects and not covering physical damage, burn, liquid damage. For more details visit MSI India Website',
    brand: 'MSI',
    category: 'Electronics',
    price: 105990,
    countInStock: 7,
    rating: 4,
    numReviews: 10
  },
  {
    name: 'Dell G15 5520 Gaming Laptop, Intel i5-12500H/16GB DDR5/1TB SSD/15.6" (39.62cm) FHD WVA AG 120Hz 250 nits/NVIDIA RTX 3050, 4 GB GDDR6/Win 11 + MSO"21/15 Months McAfee/Backlit KB/Dark Shadow Grey/2.81kg',
    image: '/uploads/51rEPuvNYFL._SL1080_.jpg',
    description:
      'Processor : 12th Gen Intel Core i5-12500H | Up to 4.50 Ghz | 12 cores | 16 Threads | 18 MB Cache | 45 W TDP // Memory : 16 GB, 2 x 8 GB, DDR5, 4800 MHz // Storage :  1TB SSD Display: 15.6" FHD 1920 x 1080 WVA, Non-Touch, Anti-Glare| 120 Hz ( 9ms ) | 250 nits | 45% NTSC Graphics: NVIDIA GeForce RTX 3050 4 GB GDDR6 with max 90 W TGP Cooling: Alienware-inspired thermal design features optimal cooling thanks to dual air-intake, copper pipes , two fans with ultra-thin blades and four strategically-placed vents. As a result, you can expect your system to stay cool when the action heats up enabling  100/100 CPU GPU concurrency and TDP up to 125 W (45W + 80 W)  Keyboard and Battery: US English Orange Qwerty Backlit Keyboard with Numeric Keypad and G-Key |3 Cell, 56 Wh, integrated Software: Pre-Loaded Windows 11 Home with Lifetime Validity | MS Office Home and Student 2021 with lifetime validity| McAfee Multi Device Security 15-month subscription Warranty: 1Yr In-Home Hardware Service Ports: SuperSpeed USB 3.2 Gen 1, SuperSpeed USB 3.2 Gen 1, USB Type-C port with DisplayPort with alt mode, SuperSpeed USB 3.2 Gen 1, HDMI 2.1, Power in, RJ45, Headphones/mic Audio & Camera |Connectivity: Dolby Audio + HD RGB camera | Intel Wi-Fi 6 AX201, 2x2, 802.11ax, Bluetooth wireless card Power Adaptor: 180W AC Adapter',
    brand: 'DELL',
    category: 'Electronics',
    price: 77490,
    countInStock: 9,
    rating: 4.1,
    numReviews: 12
  }
];

export default products;
