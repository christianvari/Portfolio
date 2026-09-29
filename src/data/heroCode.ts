// Background snippet for the hero "lens": Rust/Anchor, Go/Cosmos SDK, Solidity, Substrate.
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
}

#[pallet::call_index(0)]
pub fn transfer(origin: OriginFor<T>, dest: T::AccountId, value: BalanceOf<T>) -> DispatchResult {
    let who = ensure_signed(origin)?;
    ensure!(who != dest, Error::<T>::SelfTransfer);
    T::Currency::transfer(&who, &dest, value, ExistenceRequirement::KeepAlive)
}`;

export const typedWords = [
  "assumptions.",
  "invariants.",
  "protocol logic.",
  "real-world failure modes.",
];
