# Course-Chain: NFT Tabanlı Eğitim Platformu

Course-Chain, NFT ve blockchain teknolojilerini kullanarak eğitim içeriklerinin oluşturulması, satılması ve yönetilmesi için devrim niteliğinde bir platformdur. Bu proje, kurs oluşturucularına, kurslarını NFT olarak mintleyerek satma imkanı sunarken, kullanıcıların bu NFT'leri satın alarak kurslara erişmesini sağlar.

---

## 📂 Proje Klasör Yapısı

### Ana Dosyalar
- **`App.js`**: Uygulama rotalarını tanımlayan ana bileşen.
- **`index.js`**: React uygulamasını DOM'a render eden dosya.
- **`config.js`**: Akıllı kontrat adreslerini saklayan yapılandırma dosyası.
- **`deploy.js`**: Akıllı kontrataların deploy edilmesini sağlar.

### Sayfalar
- **`HomePage.js`**: Ana sayfa.
- **`UploadCoursePage.js`**: Kurs yükleme sayfası.
- **`PrimaryMarketPage.js`**: NFT'lerin ilk satışının yapıldığı pazar.
- **`SecondaryMarketPage.js`**: İkinci el NFT satışlarının yapıldığı pazar.
- **`AccessPage.js`**: Kullanıcıların sahip oldukları kurs NFT'lerini görüntüleyip kurs içeriklerine eriştiği sayfa.
- **`ProfilePage.js`**: Kullanıcı profili ve sertifikaların görüntülendiği sayfa.

---

- Node.js ve npm indirin
- Metamask, Ethereum ağı ile etkileşimde bulunmak için kullanılan bir tarayıcı eklentisidir. Metamask cüzdanı google a ekleyin ve bir cüzdan hesabı oluşturun.
- " npm install " ile gerekli paketleri indirin.
- " npm install --save-dev hardhat " ile hardhat' i indirin.
- 


```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js
```
