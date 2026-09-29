// Background snippet for the hero "lens": Rust/Anchor, BFT consensus (Rust), Go/Cosmos SDK, Solidity.
export const heroCode = `#[derive(Accounts)]
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
}

fn verify_commit(&self, commit: &Commit, vals: &ValidatorSet) -> Result<(), ConsensusError> {
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
}

func (k Keeper) Delegate(ctx sdk.Context, del sdk.AccAddress, amt math.Int) error {
    if amt.IsNegative() { return ErrInvalidAmount }
    val, found := k.GetValidator(ctx, del)
    if !found { return ErrNoValidator }
    // assumption: unbonding queue is bounded per block
    return k.bank.DelegateCoins(ctx, del, types.BondedPool, sdk.NewCoins(sdk.NewCoin(k.BondDenom(ctx), amt)))
}

function liquidate(address user, uint256 repay) external nonReentrant {
    uint256 hf = healthFactor(user);
    require(hf < 1e18, "healthy");
    uint256 seized = repay * price(debt) / price(collateral) * bonus / 1e4;
    _transferCollateral(user, msg.sender, seized);
}`;

export const typedWords = [
  "blockchain protocols.",
  "consensus engines.",
  "cross-chain bridges.",
  "smart contracts.",
  "financial systems.",
];
