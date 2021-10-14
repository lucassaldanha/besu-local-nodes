import java.util.Arrays;
import java.util.Collections;
import java.util.Optional;
import java.util.Random;
import org.web3j.crypto.Credentials;
import org.web3j.protocol.besu.Besu;
import org.web3j.protocol.besu.response.privacy.PrivacyGroup;
import org.web3j.protocol.core.methods.response.EthSendTransaction;
import org.web3j.protocol.core.methods.response.TransactionReceipt;
import org.web3j.protocol.http.HttpService;
import org.web3j.tx.response.PollingPrivateTransactionReceiptProcessor;
import org.web3j.utils.Base64String;

public class Main {

  public static void main(String[] args) throws Exception {
    final Credentials ALICE = Credentials
        .create("8f2a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be63");
    final Credentials BOB = Credentials
        .create("c87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3");
    final Credentials CHARLIE = Credentials
        .create("ae6ae8e5ccbfb04590405997ee2d52d2b330726137b875053c36d94e974d162f");

    final Base64String ENCLAVE_KEY_ALICE = Base64String
        .wrap("GGilEkXLaQ9yhhtbpBT03Me9iYa7U/mWXxrJhnbl1XY=");
    final Base64String ENCLAVE_KEY_BOB = Base64String
        .wrap("KkOjNLmCI6r+mICrC6l+XuEDjFEzQllaMQMpWLl4y1s=");
    final Base64String ENCLAVE_KEY_CHARLIE = Base64String
        .wrap("qaBVuA+nG7Yt+kru6CGI2VMxOBAK7b1KNmiJuInHtwc=");

    Besu nodeAlice = Besu.build(new HttpService("http://localhost:8545"));
    Besu nodeBob = Besu.build(new HttpService("http://localhost:8546"));
    Besu nodeCharlie = Besu.build(new HttpService("http://localhost:8547"));

    PollingPrivateTransactionReceiptProcessor processor = new PollingPrivateTransactionReceiptProcessor(
        nodeAlice, 1000, 15);

    // Generate a new random Base64 string for the privacy group ID
    Base64String privacyGroupId = Base64String.wrap(generateRandomBytes(32));

    // Create the privacy group
    EthSendTransaction createGroup = nodeAlice
        .privOnChainCreatePrivacyGroup(privacyGroupId, ALICE, ENCLAVE_KEY_ALICE,
            Arrays.asList(ENCLAVE_KEY_ALICE, ENCLAVE_KEY_BOB)).send();

    String txHash = createGroup.getTransactionHash();

    // Wait for the transaction to be mined & get the receipt
    TransactionReceipt receipt = processor.waitForTransactionReceipt(txHash);

    // Find the privacy group based on the two members
    Optional<PrivacyGroup> group = nodeAlice
        .privOnChainFindPrivacyGroup(Arrays.asList(ENCLAVE_KEY_ALICE, ENCLAVE_KEY_BOB))
        .send()
        .getGroups()
        .stream()
        .filter(x -> x.getPrivacyGroupId().equals(privacyGroupId))
        .findFirst();
  }

  private static byte[] generateRandomBytes(final int length) {
    byte[] b = new byte[length];
    new Random().nextBytes(b);
    return b;
  }

}
