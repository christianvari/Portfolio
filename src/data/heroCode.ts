// Background code for the hero "lens", laid out as a grid across the whole hero.
// Anchor vault, BFT commit check, Cosmos SDK keeper, CosmWasm bridge, Solidity, Substrate pallet.
export const heroSnippets = [
  `#[derive(Accounts)]
pub struct Withdraw<'info> {
    #[account(mut, has_one = authority)]
    pub vault: Account<'info, Vault>,
    pub authority: Signer<'info>,
    #[account(mut)]
    pub recipient: SystemAccount<'info>,
}

pub fn withdraw(ctx: Context<Withdraw>, amount: u64) -> Result<()> {
    let vault = &mut ctx.accounts.vault;
    require!(amount <= vault.balance, VaultError::Insufficient);
    // invariant: total_shares * price == balance
    vault.balance = vault.balance.checked_sub(amount).ok_or(VaultError::Overflow)?;
    vault.total_shares = vault.shares_for(vault.balance)?;
    Ok(())
}`,
  `fn verify_commit(&self, commit: &Commit, vals: &ValidatorSet) -> Result<(), ConsensusError> {
    ensure!(commit.height == self.height, ConsensusError::WrongHeight);
    let mut seen = HashSet::new();
    let mut power: u64 = 0;
    for vote in &commit.votes {
        // invariant: at most one vote per validator per round
        ensure!(seen.insert(vote.validator), ConsensusError::DuplicateVote);
        let val = vals.get(&vote.validator).ok_or(ConsensusError::UnknownValidator)?;
        val.pub_key.verify(&commit.sign_bytes(vote.round), &vote.signature)?;
        power = power.checked_add(val.voting_power).ok_or(ConsensusError::Overflow)?;
    }
    // assumption: more than 2/3 of the voting power is honest
    ensure!(power as u128 * 3 > vals.total_power() as u128 * 2, ConsensusError::NoQuorum);
    Ok(())
}`,
  `func (k Keeper) Delegate(ctx sdk.Context, del sdk.AccAddress, amt math.Int) error {
    if amt.IsNegative() { return ErrInvalidAmount }
    val, found := k.GetValidator(ctx, del)
    if !found { return ErrNoValidator }
    // assumption: unbonding queue is bounded per block
    return k.bank.DelegateCoins(ctx, del, types.BondedPool, sdk.NewCoins(sdk.NewCoin(k.BondDenom(ctx), amt)))
}`,
  `pub fn execute_inbound(deps: DepsMut, msg: InboundMessage, proof: Proof) -> Result<Response, BridgeError> {
    // assumption: relayers may be malicious, only the light client is trusted
    let root = LIGHT_CLIENT.load(deps.storage)?.verified_root(msg.source_height)?;
    ensure!(proof.verify(&root, &msg.hash()), BridgeError::InvalidProof);
    let expected = NONCES.may_load(deps.storage, &msg.channel)?.unwrap_or(0);
    // invariant: every message executes exactly once, in order
    ensure!(msg.nonce == expected, BridgeError::NonceMismatch { expected, got: msg.nonce });
    NONCES.save(deps.storage, &msg.channel, &(expected + 1))?;
    Ok(Response::new().add_message(msg.into_cosmos_msg()?))
}`,
  `function liquidate(address user, uint256 repay) external nonReentrant {
    uint256 hf = healthFactor(user);
    require(hf < 1e18, "healthy");
    uint256 seized = repay * price(debt) / price(collateral) * bonus / 1e4;
    _transferCollateral(user, msg.sender, seized);
}`,
  `#[pallet::call_index(0)]
pub fn transfer(origin: OriginFor<T>, dest: T::AccountId, value: BalanceOf<T>) -> DispatchResult {
    let who = ensure_signed(origin)?;
    ensure!(who != dest, Error::<T>::SelfTransfer);
    // invariant: total issuance is unchanged by transfers
    T::Currency::transfer(&who, &dest, value, ExistenceRequirement::KeepAlive)
}`,
];

export const typedWords = [
  "blockchain protocols.",
  "consensus engines.",
  "cross-chain bridges.",
  "smart contracts.",
  "financial systems.",
];
