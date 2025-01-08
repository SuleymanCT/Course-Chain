# Course-Chain: NFT Tabanlı Eğitim Platformu

Course-Chain, NFT ve blockchain teknolojilerini kullanarak eğitim içeriklerinin oluşturulması, satılması ve yönetilmesi için tasarlanmış bir platformdur. Bu proje, kurs oluşturuculara kurslarını NFT olarak mintleyip satma, kullanıcılara ise bu NFT’leri alarak kurslara erişim sağlama imkânı sunar.

## Özellikler

- **Kurs NFT’leri**: Eğitimciler kurslarını NFT olarak mintleyebilir.
- **NFT Satış ve Transferi**: Kurs NFT’leri şeffaf ve güvenli bir şekilde alınabilir, satılabilir veya transfer edilebilir.
- **Sertifika NFT’leri**: Kurs bitirildikten sonra kullanıcılara NFT sertifikaları sunulur.

---

## Gereksinimler

- **Node.js** (v14 veya üzeri)
- **npm** (Node.js ile birlikte gelir)
- **Hardhat** (Ethereum geliştirme aracı)
- **MetaMask** (Ethereum cüzdan uzantısı)

---

## Kurulum Adımları


Proje deposunu bilgisayarınıza klonlayın:

```bash
git clone https://github.com/SuleymanCT/Course-Chain.git
cd Course-Chain
```

Bağımlılıkları Yükleme

Gerekli bağımlılıkları yüklemek için:

```bash
npm install
```

### IPFS API bağlanması

YOUR_PINATA_GATEWAY_URL: Pinata’nın size verdiği gateway URL.

YOUR_PINATA_AUTH_HEADER: Pinata API anahtarınız (Bearer formatında).

const PINATA_API_KEY = "";
const PINATA_API_SECRET = "";

Pinata ile kendi API anahtarlarınızı oluşturup bu bilgileri buraya girmeniz gerekmektedir. Pinata Dashboard üzerinden API key ve gateway URL’inizi edinebilirsiniz.
Alınan URL ve Header i ContractService ve PinataService kısmındaki gerekli alana yapıştırılmalı.

,,,,

Hardhat Kurulumu

Hardhat için gerekli bağımlılıkları kurun:

```bash
npm install --save-dev hardhat
```

#### Hardhat Projesi Oluşturma

Hardhat projesini oluşturmak için:

```bash
npx hardhat
```

Komut sorularına aşağıdaki gibi cevap verin:

- **Create a basic sample project**: Yes
- **Project root**: Varsayılan olarak bırakın
- **Do you want to add a .gitignore?**: Yes
- **Install dependencies?**: Yes

#### Akıllı Kontratı Compile Etme

Kontratları derlemek için aşağıdaki komutu çalıştırın:

```bash
npx hardhat compile
```

### Akıllı Kontrat Adreslerini Yükleme
npx hardhat compile ile kontrat adresleri alındıktan sonra, src dosaysındaki config.js dosyasına gerekli adresi bilgilerinin girilmesi gerekmektedir.
-----

Yerel Blockchain Ağı Başlatma
Buradaki çıkan keyleri kopyalayıp saklayın
Hardhat ile yerel bir blockchain ağı oluşturmak için:

```bash
npx hardhat node
```

Bu komut, yerel bir blockchain ağı başlatır ve size 10 test hesabının adresini ve özel anahtarlarını gösterir.

Akıllı Kontratı Dağıtma

Kontratları yerel ağa deploy etmek için aşağıdaki komutu kullanın:

```bash
npx hardhat run scripts/deploy.js --network localhost
```

MetaMask’ı Yerel Ağa Bağlama

1. MetaMask’ı açın ve "Ağ Ekle" seçeneğine tıklayın.
2. Aşağıdaki bilgileri girin:
   - **Ağ Adı**: Hardhat Localhost
   - **Yeni RPC URL’si**: http://127.0.0.1:8545
   - **Zincir Kimliği**: 31337
   - **Para Birimi Sembolü**: ETH
3. Kaydedin ve ağa bağlanın.
4. Hardhat node komutu sonrası sakladığını hesaplardan biriinin cüzdan key ini alıp metamask tan import account yaparak gerekli işlemleri yapın. Böylece lokal ağda sınırsız test Ethereum u elde edilmiş olur.

Ardından, Hardhat Node tarafından oluşturulan test hesaplarını kullanarak MetaMask’ınızı bu ağa bağlayabilirsiniz. Bir hesabı eklemek için "Hesap İthal Et" seçeneğini kullanın ve test hesaplarından birinin özel anahtarını girin.

Uygulamayı Başlatma

React uygulamasını başlatmak için:

```bash
npm start
```

Tarayıcınızda `http://localhost:3000` adresine giderek uygulamayı kullanmaya başlayabilirsiniz.

---

