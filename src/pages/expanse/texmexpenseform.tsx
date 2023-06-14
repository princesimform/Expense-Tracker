 <Autocomplete
                      options={listOptions}
                      groupBy={(option: ListOptionType) => option.group}
                      renderGroup={renderGroup}
                      multiple
                      id='select-friends'
                      // getOptionLabel={(friendsSelectList) => friendsSelectList}
                      renderInput={(params: any) => (
                        <Field
                          name='select_friends'
                          as={TextField}
                          {...params}
                          variant='standard'
                          sx={{ mb: 2 }}
                          label='With You And'
                          color='primary'
                          placeholder='Friend of Group'
                          error={
                            Boolean(errors.select_friends) &&
                            Boolean(touched.select_friends)
                          }
                          helperText={
                            Boolean(touched.select_friends) &&
                            errors.select_friends
                          }
                        />
                      )}
                      aria-required
                      onChange={(
                        e: SyntheticEvent<Element, Event>,
                        value: ListOptionType[],
                        reason: AutocompleteChangeReason,
                        details?: AutocompleteChangeDetails<ListOptionType>
                      ) =>
                        onSelectListOptions(
                          e,
                          value,
                          reason,
                          setFieldValue,
                          details
                        )
                      }
                    />
                    <Grid container spacing={1}>
                      <Grid item xs={2} sm={2} lg={2}>
                        <InputLabel
                          htmlFor='bill-image'
                          className='m-auto flex w-fit text-center'
                          sx={{ mb: 2 }}
                        >
                          <Field
                            style={{ display: "none" }}
                            id='bill-image'
                            name='expense_file'
                            type='file'
                            value={undefined}
                            onChange={(event: ChangeEvent<HTMLInputElement>) =>
                              handleInputChange(event, setFieldValue)
                            }
                            error={
                              Boolean(errors.expense_file) &&
                              Boolean(touched.expense_file)
                            }
                            helperText={
                              Boolean(touched.expense_file) &&
                              errors.expense_file
                            }
                          />
                          <Avatar
                            sx={{
                              bgcolor: `${
                                formValues.expense_file != null
                                  ? "green"
                                  : "primary"
                              }`,
                            }}
                          >
                            <Assignment />
                          </Avatar>
                          {/* <Avatar
                        alt="Remy Sharp"
                        // src={
                        //   GroupProfileimage
                        //     ? hasOldIamge
                        //       ? GroupProfileimage
                        //       : JSON.parse(GroupProfileimage)
                        //     : AddGroupImg
                        // }
                        sx={{
                          width: 100,
                          height: 100,
                          borderWidth: 2,
                          borderColor: "primary",
                        }}
                      /> */}
                        </InputLabel>
                      </Grid>
                      <Grid item xs={10} sm={10} lg={10}>
                        <Field
                          name='expense_description'
                          type='text'
                          variant='outlined'
                          color='primary'
                          label='Description'
                          fullWidth
                          sx={{ mb: 2 }}
                          as={TextField}
                          size='small'
                          error={
                            Boolean(errors.expense_description) &&
                            Boolean(touched.expense_description)
                          }
                          helperText={
                            Boolean(touched.expense_description) &&
                            errors.expense_description
                          }
                          onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            handleInputChange(e, setFieldValue)
                          }
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={1}>
                      <Grid item xs={2} sm={2} lg={2}>
                        <Select
                          labelId='demo-simple-select-label'
                          id='demo-simple-select'
                          label='Age'
                          name='currency_type'
                          size='small'
                          
                          defaultValue='USD'
                        >
                          <MenuItem value={"USD"}>USD</MenuItem>
                        </Select>
                      </Grid>
                      <Grid item xs={10} sm={10} lg={10}>
                        <Field
                          name='expense_amount'
                          type='number'
                          variant='outlined'
                          color='primary'
                          label='Amount'
                          fullWidth
                          sx={{ mb: 2 }}
                          as={TextField}
                          size='small'
                          error={
                            Boolean(errors.expense_amount) &&
                            Boolean(touched.expense_amount)
                          }
                          helperText={
                            Boolean(touched.expense_amount) &&
                            errors.expense_amount
                          }
                          onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            handleInputChange(e, setFieldValue)
                          }
                        />
                      </Grid>
                    </Grid>

                    <FormControl variant='standard' fullWidth sx={{ mb: 2 }}>
                      <InputLabel id='demo-simple-select-filled-label'>
                        Paid by
                      </InputLabel>
                      <Select
                        labelId='demo-simple-select-label'
                        id='demo-simple-select'
                        label='Paid By'
                        name='paid_by'
                        size='small'
                        // defaultValue={userData?.email}
                        error={
                          Boolean(errors.paid_by) && Boolean(touched.paid_by)
                        }
                        // helperText={Boolean(touched.paid_by) && errors.paid_by}
                        onChange={(e: SelectChangeEvent) =>
                          setFieldValue(e.target.name, e.target.value)
                        }
                      >
                        {userData?.email && (
                          <MenuItem value={userData?.email}>You</MenuItem>
                        )}
                        {paidByList.length > 0 ? (
                          paidByList.map((item) => (
                            <MenuItem value={item}>{item}</MenuItem>
                          ))
                        ) : (
                          <></>
                        )}
                      </Select>
                    </FormControl>

                    <FormControl fullWidth variant='standard' sx={{ mb: 2 }}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={[]}>
                          <DemoItem label='Expanse Date'>
                            <DatePicker
                              defaultValue={dayjs(currentDate)}
                              slotProps={{ textField: { size: "small" } }}
                              maxDate={dayjs(currentDate + 1)}
                              onChange={(date) => {
                                const newDate = new Date(String(date));
                                setFieldValue("expense_date", newDate);
                              }}
                            />
                          </DemoItem>
                        </DemoContainer>
                      </LocalizationProvider>
                    </FormControl>