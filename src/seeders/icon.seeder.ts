import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Icon } from '@src/models/Icon';

export default class IconSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const iconRepo = dataSource.getRepository(Icon);

    const iconData = [
      { name: 'moneyBill', svgUrl: 'faMoneyBill', id: 1 },
      { name: 'house', svgUrl: 'faHouse' },
      { name: 'magnifying-glass', svgUrl: 'faMagnifyingGlass' },
      { name: 'user', svgUrl: 'faUser' },
      { name: 'facebook', svgUrl: 'faFacebook' },
      { name: 'check', svgUrl: 'faCheck' },
      { name: 'download', svgUrl: 'faDownload' },
      { name: 'twitter', svgUrl: 'faTwitter' },
      { name: 'image', svgUrl: 'faImage' },
      { name: 'instagram', svgUrl: 'faInstagram' },
      { name: 'phone', svgUrl: 'faPhone' },
      { name: 'tiktok', svgUrl: 'faTiktok' },
      { name: 'bars', svgUrl: 'faBars' },
      { name: 'envelope', svgUrl: 'faEnvelope' },
      { name: 'linkedin', svgUrl: 'faLinkedin' },
      { name: 'star', svgUrl: 'faStar' },
      { name: 'location-dot', svgUrl: 'faLocationDot' },
      { name: 'github', svgUrl: 'faGithub' },
      { name: 'music', svgUrl: 'faMusic' },
      { name: 'wand-magic-sparkles', svgUrl: 'faWandMagicSparkles' },
      { name: 'heart', svgUrl: 'faHeart' },
      { name: 'arrow-right', svgUrl: 'faArrowRight' },
      { name: 'discord', svgUrl: 'faDiscord' },
      { name: 'circle-xmark', svgUrl: 'faCircleXmark' },
      { name: 'bomb', svgUrl: 'faBomb' },
      { name: 'poo', svgUrl: 'faPoo' },
      { name: 'camera-retro', svgUrl: 'faCameraRetro' },
      { name: 'xmark', svgUrl: 'faXmark' },
      { name: 'youtube', svgUrl: 'faYoutube' },
      { name: 'cloud', svgUrl: 'faCloud' },
    ];

    await iconRepo.delete({});

    await iconRepo.save(iconData);
    console.log('Icon data seeded successfully'); 
  }
}
