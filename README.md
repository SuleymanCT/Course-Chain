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

Yerel Blockchain Ağı Başlatma

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

Ardından, Hardhat Node tarafından oluşturulan test hesaplarını kullanarak MetaMask’ınızı bu ağa bağlayabilirsiniz. Bir hesabı eklemek için "Hesap İthal Et" seçeneğini kullanın ve test hesaplarından birinin özel anahtarını girin.

Uygulamayı Başlatma

React uygulamasını başlatmak için:

```bash
npm start
```

Tarayıcınızda `http://localhost:3000` adresine giderek uygulamayı kullanmaya başlayabilirsiniz.

---

